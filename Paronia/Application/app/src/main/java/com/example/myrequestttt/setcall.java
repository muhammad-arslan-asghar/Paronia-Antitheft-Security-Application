package com.example.myrequestttt;

public class setcall {


    private String duration;
    private String name;
    private String number;
    private String type;
    private String email;
    public setcall() {
    }

    public void setemail(String em) {
        this.email = em;
    }
    public String getemail() {
        return email;
    }

    public String getduration() {
        return duration;
    }

    public void setduration(String d) {
        this.duration = d;


    }
    public String getname() {
        return name;
    }

    public void setname(String p) {
        this.name = p;


    }
    public String getnumber() {
        return number;
    }

    public void setnumber(String s) {
        this.number = s;


    }
    public String gettype() {
        return type;
    }

    public void settype(String g) {
        this.type = g;


    }


}
