package com.tcha.bookmark.repository;


import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.tcha.bookmark.entity.Bookmark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {

    @Query(value = "DELETE FROM Bookmark b WHERE b.id = :id")
    int updateBookMarkStatus(Long id);


    @Query(value = "FROM Bookmark b WHERE b.user.id = :userId")
    List<Bookmark> findByUserId(UUID userId);
}