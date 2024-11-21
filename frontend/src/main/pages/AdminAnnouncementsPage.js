import React from "react";
import Button from 'react-bootstrap/Button';
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useBackend } from "main/utils/useBackend";
import AnnouncementTable from "main/components/Announcement/AnnouncementTable"
import { useCurrentUser } from "main/utils/currentUser";


export default function AdminAnnouncementsPage() {
    const { data: currentUser } = useCurrentUser(); 
    const { commonsId } = useParams();

    // Stryker disable all
    const { data: commonsPlus } = useBackend(
        [`/api/commons/plus?id=${commonsId}`],
        {
            method: "GET",
            url: "/api/commons/plus",
            params: {
                id: commonsId,
            },
        }
    );
    // Stryker restore all

    const commonsName = commonsPlus?.commons.name;

    const { data: response, error: _error, status: _status } = useBackend(
      [`/api/announcements/getbycommonsid?commonsId=${commonsId}`],
      {
          method: "GET",
          url: "/api/announcements/getbycommonsid",
          params: {
              commonsId: commonsId,
          },
      },
      []
    );
    const announcements = response?.content || [];


    return (
      <BasicLayout>

        <div className="pt-2">
          <Row  className="pt-5">
            <Col>
              <h2>Announcements for Commons: {commonsName}</h2>
              <AnnouncementTable announcements={announcements} currentUser={currentUser} />
              <Button variant = "primary" href = {`/admin/announcements/${commonsId}/create`} >
                Create Announcement
              </Button>
            </Col>
          </Row>
        </div>
      </BasicLayout>
    );

};