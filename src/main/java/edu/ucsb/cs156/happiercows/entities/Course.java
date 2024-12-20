package edu.ucsb.cs156.happiercows.entities;

import lombok.*;

import javax.persistence.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity(name = "courses")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;
    private String school;
    private String term;
    private LocalDateTime startDate;
    private LocalDateTime endDate;  
}

