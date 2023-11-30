import { React, useState } from "react";

import { useParams } from "react-router-dom";
import { hasRole } from "main/utils/currentUser";

import LeaderboardTable from "main/components/Leaderboard/LeaderboardTable";
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";

import { useBackend } from "main/utils/useBackend";
import { useCurrentUser } from "main/utils/currentUser";
import Background from "../../assets/PlayPageBackground.png";

import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function LeaderboardPage() {
    const { commonsId } = useParams();
    const { data: currentUser } = useCurrentUser();
    const [playPageId, setPlayPageId] = useState(1);

    // Stryker disable all
    const {
        data: userCommons,
        error: _error,
        status: _status,
    } = useBackend(
        [`/api/usercommons/commons/all?commonsId=${commonsId}`],
        {
            method: "GET",
            url: "/api/usercommons/commons/all",
            params: {
                commonsId: commonsId,
            },
        },
        []
    );
    // Stryker restore all

    // Stryker disable all
    const {
        data: commons,
        error: _commonsError,
        status: _commonsStatus,
    } = useBackend(
        [`/api/commons?id=${commonsId}`],
        {
            method: "GET",
            url: "/api/commons",
            params: {
                id: commonsId,
            },
        },
        []
    );
    // Stryker restore all

    const navigate = useNavigate();


    const showLeaderboard =
        hasRole(currentUser, "ROLE_ADMIN") || commons.showLeaderboard;
    return (
        <div
            data-testid={"LeaderboardPage-main-div"}
            style={{
                backgroundSize: "cover",
                backgroundImage: `url(${Background})`,
            }}
        >
            <BasicLayout>
                <div className="pt-2">
                    <h1>Leaderboard</h1>
                    {showLeaderboard ? (
                        <>
                            <LeaderboardTable
                                leaderboardUsers={userCommons}
                                currentUser={currentUser}
                            />
                            <div className="d-flex">
                                <input
                                    type="number"
                                    value={playPageId}
                                    onChange={(e) =>
                                        setPlayPageId(e.target.value)
                                    }
                                    className="form-control mr-2"
                                    placeholder="Enter User ID to visit"
                                />
                                <Button
                                    href={`/admin/play/${commonsId}/user/${playPageId}`}
                                    data-testid="LeaderboardPage-play-page-button"
                                >
                                    Play Page
                                </Button>
                            </div>
                        </>
                    ) : (
                        <p>You're not authorized to see the leaderboard.</p>
                    )}
                </div>
                <Button
                    onClick={() => navigate(-1)}
                    data-testid="LeaderboardPage-back-button"
                >
                    Back
                </Button>
            </BasicLayout>
        </div>

}
