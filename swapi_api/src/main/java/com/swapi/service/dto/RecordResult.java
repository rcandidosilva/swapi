package com.swapi.service.dto;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class RecordResult<I> implements Serializable {
        private I properties;
        private String description;
        private String uid;

        public I getProperties() {
            return properties;
        }

        public void setProperties(I properties) {
            this.properties = properties;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }

        public String getUid() {
            return uid;
        }

        public void setUid(String uid) {
            this.uid = uid;
        }
}