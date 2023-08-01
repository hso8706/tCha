package com.tcha.utils.exceptions.codes;

import lombok.Getter;

public enum ExceptionCode {
    USER_NOT_FOUND(404, "User not found"),
    USER_PROFILE_NOT_FOUND(404, "User Profile not found"),
    QUESTION_NOT_FOUND(404, "Question not found");

    /* 참고용
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EXISTS(409, "Member exists"),
    MEMBER_REDIRECTION_LOGIN_SUCCESS(303, "Member redirection login success"),
    MEMBER_REDIRECTION_FIND_PASSWORD(303, "Member redirection find password"),
    MEMBER_NAME_EXISTS(409, "Member name exist"),
    MEMBER_UNAUTHORIZED(401, "Member unauthorized"),
    ANSWER_NOT_FOUND(404, "Answer not found"),
    QUESTION_NOT_FOUND(404, "Question not found");
     */

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
