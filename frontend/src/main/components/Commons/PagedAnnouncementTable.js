import React from "react";
import { useBackend } from "main/utils/useBackend";
import { useParams } from "react-router-dom";

const PagedAnnouncementTable = () => {

    const refreshJobsIntervalMilliseconds = 5000;
    const { commonsId } = useParams();

    // Stryker disable all
    const {
        data: page
    } = useBackend(
        ["/api/announcements/getbycommonsid"],
        {
            method: "GET",
            url: "/api/announcements/getbycommonsid", 
            params: {
                commonsId: commonsId,
            }
        },
        {content: [], totalPages: 0},
        { refetchInterval: refreshJobsIntervalMilliseconds }
    );
    // Stryker restore  all

    const testid = "PagedAnnouncementTable";

    const sortees = React.useMemo(
        () => [
            {
                id: "startDate",
                desc: true
            }
        ],
        []
    );

    const legalDate = React.useMemo(() => {
        const now = new Date();
        return page.content
            .filter((announcement) => {
                const startDate = new Date(announcement.startDate);
                const endDate = new Date(announcement.endDate);
                if (!endDate) {
                    return startDate <= now;
                } 
                else {
                    return (startDate <= now) && (now <= endDate);
                }
            })
            .sort((a, b) => new Date(b.startDate) - new Date(a.startDate)); // 保持按时间降序排序
    }, [page.content]);

    return (
        <div data-testid={testid}>
            {legalDate.map((announcement, index) => (
                <div key={announcement.id || index}>
                    {announcement.announcementText}
                </div>
            ))}
        </div>
    );
}; 

export default PagedAnnouncementTable;