package com.swapi.service.dto;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Record<T> implements Serializable {

        private String uid;
        private String description;
        private String message;
        private RecordResult<T> result;

        public String getUid() {
            return uid;
        }

        public void setUid(String uid) {
            this.uid = uid;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }

        public RecordResult<T> getResult() {
            return result;
        }

        public void setResult(RecordResult<T> result) {
            this.result = result;
        }
}