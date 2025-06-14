package com.swapi.service.dto;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ListRecord<T> implements Serializable {

        private String message;
        private List<RecordResult<T>> result;

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }

        public List<RecordResult<T>> getResult() {
            return result;
        }

        public void setResult(List<RecordResult<T>> result) {
            this.result = result;
        }
}