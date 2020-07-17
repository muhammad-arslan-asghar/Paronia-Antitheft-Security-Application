package com.example.myrequestttt;

public class location {
    private String latitude;
    private String longitude;
    private String place;
    private String email;

    public location() {
    }

    public String getLatitude() {
        return latitude;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }


    public void setemail(String em) {
        this.email = em;
    }
    public String getemail() {
        return email;
    }



    public String getLongitude() {
        return longitude;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }

    public String getPlace() {
        return place;
    }

    public void setPlace(String place) {
        this.place = place;
    }
}
