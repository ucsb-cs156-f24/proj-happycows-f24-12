import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import { useParams } from "react-router-dom";
import AnnouncementForm from "main/components/Announcement/AnnouncementForm";
import { Navigate } from 'react-router-dom'
import { useBackend, useBackendMutation } from "main/utils/useBackend";
import { toast } from "react-toastify";

export default function AdminEditAnnouncementsPage() {
  let { id } = useParams();

  const { data: announcement, _error, _status } =
    useBackend(
      // Stryker disable next-line all : don't test internal caching of React Query
      [`/api/announcements?id=${id}`],
      {  // Stryker disable next-line all : GET is the default, so changing this to "" doesn't introduce a bug
        method: "GET",
        url: `/api/announcements`,
        params: {
          id
        }
      }
    );


  const objectToAxiosPutParams = (announcement) => ({
    url: "/api/announcements/update",
    method: "PUT",
    params: {
      id: announcement.id,
    },
    data: {
        "announcementText": announcement.announcementText,
        "startDate": announcement.startDate,
        "endDate": announcement.endDate,
    }
  });

  const onSuccess = (_, announcement) => {
    toast(`Announcement Updated - id: ${announcement.id}`);
  }

  const mutation = useBackendMutation(
    objectToAxiosPutParams,
    { onSuccess },
    // Stryker disable next-line all : hard to set up test for caching
    [`/api/announcement?id=${id}`]
  );

  const { isSuccess } = mutation

  const submitAction = async (data) => {
    mutation.mutate(data);
  }

  if (isSuccess) {
    return <Navigate to="/admin/announcements" />
  }

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Edit Announcements</h1>
        {announcement &&
          <AnnouncementForm initialAnnouncement={announcement} submitAction={submitAction} buttonLabel="Update" />
        }
      </div>
    </BasicLayout>
  )
}

