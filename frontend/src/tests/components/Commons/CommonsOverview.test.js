import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

import CommonsOverview from "main/components/Commons/CommonsOverview"; 
import PlayPage from "main/pages/PlayPage";
import commonsFixtures from "fixtures/commonsFixtures"; 
import leaderboardFixtures from "fixtures/leaderboardFixtures";
import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import commonsPlusFixtures from "fixtures/commonsPlusFixtures";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: () => ({
        commonsId: 1
    }),
    useNavigate: () => mockNavigate
}));

describe("CommonsOverview tests", () => {

    const queryClient = new QueryClient();
    const axiosMock = new AxiosMockAdapter(axios);

    beforeEach(() => {
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
    });

    test("renders without crashing", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <CommonsOverview commonsPlus={commonsPlusFixtures.oneCommonsPlus[0]} />
            </QueryClientProvider>
        );
    });

    test("Redirects to the LeaderboardPage for an admin when you click visit", async () => {
        apiCurrentUserFixtures.adminUser.user.commons[0] = commonsFixtures.oneCommons;
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.adminUser);
        axiosMock.onGet("/api/commons/plus", {params: {id:1}}).reply(200, commonsPlusFixtures.oneCommonsPlus[0]);
        axiosMock.onGet("/api/leaderboard/all").reply(200, leaderboardFixtures.threeUserCommonsLB);
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <PlayPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
        await waitFor(() => {
            expect(axiosMock.history.get.length).toEqual(5);
        });
        expect(await screen.findByTestId("user-leaderboard-button")).toBeInTheDocument();
        const leaderboardButton = screen.getByTestId("user-leaderboard-button");
        fireEvent.click(leaderboardButton);
        //expect(mockNavigate).toBeCalledWith({ "to": "/leaderboard/1" });
    });

    test("No LeaderboardPage for an ordinary user when commons has showLeaderboard = false", async () => {
        const ourCommons = {
            ...commonsFixtures.oneCommons,
            showLeaderboard : false
        };
        const ourCommonsPlus = {
            ...commonsPlusFixtures.oneCommonsPlus,
            commons : ourCommons
        }
        apiCurrentUserFixtures.userOnly.user.commonsPlus = commonsPlusFixtures.oneCommonsPlus[0];
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
        axiosMock.onGet("/api/commons/plus", {params: {id:1}}).reply(200, ourCommonsPlus);
        axiosMock.onGet("/api/leaderboard/all").reply(200, leaderboardFixtures.threeUserCommonsLB);
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <PlayPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
        await waitFor(() => {
            expect(axiosMock.history.get.length).toEqual(3);
        });
        expect(() => screen.getByTestId("user-leaderboard-button")).toThrow();
    });

    test("for announcement table button", async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <CommonsOverview commonsPlus={commonsPlusFixtures.oneCommonsPlus[0]} currentUser={apiCurrentUserFixtures.userOnly} />
                </MemoryRouter>
            </QueryClientProvider>
        );

        expect(screen.getByText("Hide Announcements")).toBeInTheDocument();
        
        const changeButton = screen.getByText("Hide Announcements");
        fireEvent.click(changeButton);
        
        expect(screen.getByText("Show Announcements")).toBeInTheDocument();
        
        fireEvent.click(changeButton);
        
        expect(screen.getByText("Hide Announcements")).toBeInTheDocument();
    });

    test("changing button for multiples times works correctly", async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <CommonsOverview 
                        commonsPlus={commonsPlusFixtures.oneCommonsPlus[0]}
                        currentUser={apiCurrentUserFixtures.userOnly}
                    />
                </MemoryRouter>
            </QueryClientProvider>
        );

        const getButtonState = () => screen.getByRole('button', { 
            name: /Hide Announcements|Show Announcements/
        });
        expect(getButtonState()).toHaveTextContent("Hide Announcements");
        expect(screen.getByTestId("PagedAnnouncementTable-header-startDate")).toBeInTheDocument();

        fireEvent.click(getButtonState());
        expect(getButtonState()).toHaveTextContent("Show Announcements");
        expect(screen.queryByTestId("PagedAnnouncementTable-header-startDate")).not.toBeInTheDocument();

        fireEvent.click(getButtonState());
        expect(getButtonState()).toHaveTextContent("Hide Announcements");
        expect(screen.getByTestId("PagedAnnouncementTable-header-startDate")).toBeInTheDocument();

        fireEvent.click(getButtonState());
        expect(getButtonState()).toHaveTextContent("Show Announcements");
        expect(screen.queryByTestId("PagedAnnouncementTable-header-startDate")).not.toBeInTheDocument();
    });


    test("leaderboard button navigates to correct common's leaderboard", () => {
        const testCommonsPlus = {
            ...commonsPlusFixtures.oneCommonsPlus[0],
            commons: {
                ...commonsPlusFixtures.oneCommonsPlus[0].commons,
                id: 2,
                showLeaderboard: true
            }
        };

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <CommonsOverview 
                        commonsPlus={testCommonsPlus}
                        currentUser={apiCurrentUserFixtures.userOnly}
                    />
                </MemoryRouter>
            </QueryClientProvider>
        );

        const leaderboardButton = screen.getByTestId("user-leaderboard-button");
        fireEvent.click(leaderboardButton);

        expect(mockNavigate).toHaveBeenCalledWith("/leaderboard/2");
        expect(mockNavigate).toHaveBeenCalledTimes(1);
    });

    test("leaderboard button uses correct URL", () => {
        const testCommonsPlus = {
            ...commonsPlusFixtures.oneCommonsPlus[0],
            commons: {
                ...commonsPlusFixtures.oneCommonsPlus[0].commons,
                id: 2,
                showLeaderboard: true
            }
        };

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <CommonsOverview 
                        commonsPlus={testCommonsPlus}
                        currentUser={apiCurrentUserFixtures.userOnly}
                    />
                </MemoryRouter>
            </QueryClientProvider>
        );

        const leaderboardButton = screen.getByTestId("user-leaderboard-button");
        fireEvent.click(leaderboardButton);

        expect(mockNavigate).toHaveBeenCalledWith("/leaderboard/2");

        expect(mockNavigate).not.toHaveBeenCalledWith("2");
        expect(mockNavigate).not.toHaveBeenCalledWith("/2");
        expect(mockNavigate).not.toHaveBeenCalledWith("leaderboard/2");
    });
});