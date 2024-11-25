import { fireEvent, render, screen } from "@testing-library/react";
import OurTable, { ButtonColumn, DateColumn, PlaintextColumn } from "main/components/OurTable";

describe("OurTable tests (optimized)", () => {
    const generateRows = (count) => {
        return Array.from({ length: count }, (_, i) => ({
            col1: `Hello ${i}`,
            col2: `World ${i}`,
            createdAt: `2021-04-01T04:00:00.000`,
            log: `foo\nbar\n  baz ${i}`,
        }));
    };

    const threeRows = [
        {
            col1: "Hello",
            col2: "World",
            createdAt: "2021-04-01T04:00:00.000",
            log: "foo\nbar\n  baz",
        },
        {
            col1: "react-table",
            col2: "rocks",
            createdAt: "2022-01-04T14:00:00.000",
            log: "foo\nbar",
        },
        {
            col1: "whatever",
            col2: "you want",
            createdAt: "2023-04-01T23:00:00.000",
            log: "bar\n  baz",
        },
    ];
    
    const hundredRows = Array.from({ length: 100 }, (_, i) => ({
        col1: `Hello ${i}`,
        col2: `World ${i}`,
        createdAt: "2021-04-01T04:00:00.000",
        log: `foo\nbar\n  baz ${i}`,
    }));
    

    const columns = [
        { Header: "Column 1", accessor: "col1" },
        { Header: "Column 2", accessor: "col2" },
        ButtonColumn("Click", "primary", jest.fn(), "testId"),
        DateColumn("Date", (cell) => cell.row.original.createdAt),
        PlaintextColumn("Log", (cell) => cell.row.original.log),
    ];

    const renderTable = (data, testid = "testid") =>
        render(<OurTable columns={columns} data={data} testid={testid} />);

    test("renders an empty table without crashing", () => {
        renderTable([]);
        expect(screen.queryByTestId("testid-prev-page-button")).toBeNull();
    });

    test("renders a table with data and pagination behavior", () => {
        const data = generateRows(15);
        renderTable(data);
        expect(screen.queryByTestId("testid-next-page-button")).toBeInTheDocument();

        fireEvent.click(screen.getByTestId("testid-next-page-button"));
        expect(screen.getByTestId("testid-current-page-button")).toHaveTextContent("2");
    });

    test("button click triggers callback", async () => {
        const clickCallback = jest.fn();
        const buttonColumns = [
            ButtonColumn("Click", "primary", clickCallback, "testId"),
        ];
        render(<OurTable columns={buttonColumns} data={generateRows(3)} />);
        fireEvent.click(await screen.findByTestId("testId-cell-row-0-col-Click-button"));
        expect(clickCallback).toHaveBeenCalledTimes(1);
    });

    test.each([
        ["Column 1", "col1"],
        ["Column 2", "col2"],
    ])("sort toggles for %s", async (_, accessor) => {
        renderTable(generateRows(3));
        const header = await screen.findByTestId(`testid-header-${accessor}`);
        fireEvent.click(header);
        expect(await screen.findByText("🔼")).toBeInTheDocument();
        fireEvent.click(header);
        expect(await screen.findByText("🔽")).toBeInTheDocument();
    });

    test("pagination navigation works correctly", () => {
        const data = generateRows(60);
        renderTable(data);

        // Go to last page
        fireEvent.click(screen.getByTestId("testid-last-page-button"));
        expect(screen.getByTestId("testid-current-page-button")).toHaveTextContent("6");

        // Return to first page
        fireEvent.click(screen.getByTestId("testid-first-page-button"));
        expect(screen.getByTestId("testid-current-page-button")).toHaveTextContent("1");
    });

        test.each([
            [1, "testid-forward-one-page-button", "2"],
            [2, "testid-forward-two-page-button", "4"], // Corrected from "3" to "4"
            [3, "testid-back-one-page-button", "2"],   // Back to previous behavior
        ])("navigates using %s", async (currentPage, buttonId, expectedPage) => {
            renderTable(generateRows(60));
            for (let i = 1; i < currentPage; i++) {
                fireEvent.click(screen.getByTestId("testid-next-page-button"));
            }
            fireEvent.click(screen.getByTestId(buttonId));
            expect(await screen.findByTestId("testid-current-page-button")).toHaveTextContent(expectedPage);
        });

        test("renders ellipsis in pagination correctly", () => {
            renderTable(generateRows(100)); // 100 rows ensure at least 10 pages with a pageSize of 10
        
            // Navigate to page 5 (zero-based index 4)
            fireEvent.click(screen.getByTestId("testid-next-page-button")); // Page 2
            fireEvent.click(screen.getByTestId("testid-next-page-button")); // Page 3
            fireEvent.click(screen.getByTestId("testid-next-page-button")); // Page 4
            fireEvent.click(screen.getByTestId("testid-next-page-button")); // Page 5
        
            // Verify left ellipsis appears
            expect(screen.getByTestId("testid-left-ellipsis")).toBeInTheDocument();
        
            // Navigate further to page 6
            fireEvent.click(screen.getByTestId("testid-next-page-button")); // Page 6
        
            // Verify right ellipsis appears
            expect(screen.getByTestId("testid-right-ellipsis")).toBeInTheDocument();
        });
        
        
        
        
});
