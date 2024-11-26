/*
package edu.ucsb.cs156.happiercows.integration;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import edu.ucsb.cs156.happiercows.entities.Announcement;
import edu.ucsb.cs156.happiercows.entities.User;
import edu.ucsb.cs156.happiercows.entities.UserCommons;
import edu.ucsb.cs156.happiercows.entities.Commons;
import edu.ucsb.cs156.happiercows.entities.UserCommonsKey;
import edu.ucsb.cs156.happiercows.repositories.AnnouncementRepository;
import edu.ucsb.cs156.happiercows.repositories.UserCommonsRepository;
import edu.ucsb.cs156.happiercows.repositories.UserRepository;
import edu.ucsb.cs156.happiercows.services.CurrentUserService;
import edu.ucsb.cs156.happiercows.services.GrantedAuthoritiesService;
import edu.ucsb.cs156.happiercows.testconfig.TestConfig;

@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@ActiveProfiles("integration")
@Import(TestConfig.class)
@DirtiesContext(classMode = ClassMode.BEFORE_EACH_TEST_METHOD)
public class AnnouncementsIT {

    @Autowired
    public MockMvc mockMvc;

    @Autowired
    public ObjectMapper mapper;

    @MockBean
    private CurrentUserService currentUserService;

    @Autowired
    private AnnouncementRepository announcementRepository;

    @Autowired
    private UserCommonsRepository userCommonsRepository;

    @MockBean
    private UserRepository userRepository;

    @WithMockUser(roles = { "USER" })
@Test
public void getAnnouncementsByCommonsIdTest() throws Exception {
    // Arrange
    long commonsId = 1L;

    // Mock the current user
    User mockUser = User.builder()
            .id(1L)
            .fullName("Test User")
            .email("testuser@example.com")
            .build();
    Mockito.when(currentUserService.getUser()).thenReturn(mockUser);

    // Mock Commons
    Commons mockCommons = Commons.builder()
            .id(commonsId)
            .name("Test Commons")
            .startingBalance(1000.0)
            .build();

    // Create a UserCommons for this test
    UserCommons userCommons = UserCommons.builder()
            .user(mockUser)
            .commons(mockCommons)
            .username(mockUser.getFullName())
            .totalWealth(1000.0)
            .numOfCows(5)
            .cowHealth(100.0)
            .cowsBought(2)
            .cowsSold(1)
            .cowDeaths(0)
            .build();
    userCommonsRepository.save(userCommons);

    // Create announcements
    List<Announcement> expectedAnnouncements = new ArrayList<>();
    Announcement announcement1 = Announcement.builder()
            .commonsId(commonsId)
            .startDate(new Date())
            .endDate(null)
            .announcementText("Test Announcement 1")
            .build();
    Announcement announcement2 = Announcement.builder()
            .commonsId(commonsId)
            .startDate(new Date())
            .endDate(null)
            .announcementText("Test Announcement 2")
            .build();
    expectedAnnouncements.add(announcement1);
    expectedAnnouncements.add(announcement2);

    announcementRepository.save(announcement1);
    announcementRepository.save(announcement2);

    // Act
    MvcResult response = mockMvc.perform(get("/api/announcements/getbycommonsid")
            .param("commonsId", String.valueOf(commonsId))
            .contentType("application/json"))
            .andExpect(status().isOk())
            .andReturn();

    // Assert
    String responseString = response.getResponse().getContentAsString();
    List<Announcement> actualAnnouncements = mapper.readValue(responseString, new TypeReference<List<Announcement>>() {});
    assertEquals(expectedAnnouncements, actualAnnouncements);
}

}
*/