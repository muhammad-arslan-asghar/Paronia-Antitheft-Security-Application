package com.example.myrequestttt;

import io.reactivex.Observable;
import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import retrofit2.http.Body;
import retrofit2.http.Multipart;
import retrofit2.http.POST;
import retrofit2.http.Part;


public interface IMyService {

    @POST("api/commands/getloc")
    Observable<Object> signupUser(@Body location body);
//    @Multipart
//    @POST("api/commands/getimg")
//    Observable<Object> uploadFile1(@Part MultipartBody.Part file);
setEmail s=new setEmail();
     final String v=s.getemail();
    @Multipart
    @POST("api/uploads/photo")
    Observable<Object> uploadFile(@Part MultipartBody.Part file, @Part ("email") RequestBody email);

    @Multipart
    @POST("api/commands/getaud")
    Observable<Object> uploadFileaud(@Part MultipartBody.Part file,@Part ("email") RequestBody email);

    @POST("api/users/login")
    Observable<Object> loginUser(@Body setlogin body);

    @POST("api/commands/call")
    Observable<Object> callsent(@Body setcall body);


}
