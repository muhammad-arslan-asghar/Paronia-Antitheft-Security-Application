package com.example.myrequestttt;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import io.reactivex.android.schedulers.AndroidSchedulers;
import io.reactivex.disposables.CompositeDisposable;
import io.reactivex.functions.Consumer;
import io.reactivex.schedulers.Schedulers;
import retrofit2.Retrofit;

public class Login extends AppCompatActivity {
    EditText password,username;
    Button login;
    CompositeDisposable compositeDisposable = new CompositeDisposable();
    IMyService iMyService;
    static  String Email="";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
      username = (EditText)findViewById(R.id.et_email);
      password = (EditText)findViewById(R.id.et_password);
       login=(Button)findViewById(R.id.btn_login);



        login.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {


                Toast.makeText(getApplicationContext(),
                        "click", Toast.LENGTH_SHORT).show();

                Retrofit retrofit = RetrofitClient.getInstance();
                iMyService = retrofit.create(IMyService.class);

                setlogin loc1 = new setlogin();
                loc1.setemail(username.getText().toString());
                loc1.setpass(password.getText().toString());

                Email=username.getText().toString();

                compositeDisposable.add(iMyService.loginUser(loc1)
                        .subscribeOn(Schedulers.io())
                        .observeOn(AndroidSchedulers.mainThread())
                        .subscribe(
                                new Consumer<Object>() {
                                    @Override
                                    public void accept(Object s) throws Exception{
//                                    Toast.makeText(GoogleService.this, s.toString(), Toast.LENGTH_SHORT).show();

                                        String response = "";
                                        if (s.toString().contains("invalid")) {
                                            response = s.toString().replace("{error=", "");
                                            response = response.replace("}", "");
                                            Toast.makeText(Login.this, response, Toast.LENGTH_SHORT).show();
                                        } else {
                                            response = s.toString().replace("{token=", "")
                                                    .replace("user={_id=", "")
                                                    .replace("name=", "")
                                                    .replace("email=", "")
                                                    .replace("}}", "");

                                            String[] details = response.split(",");
                                            System.out.println(response+"Response");
                                            Log.d(String.valueOf(details), "Details");

//                                            user USER = new user();
//                                            USER.setToken(details[0]);
//                                            USER.setId(details[1]);
//                                            USER.setName(details[2]);
//                                            USER.setEmail(details[3]);
//                                            USER.setPassword(password.getText().toString());
//                                            common.currentUser = USER;
//
//                                            saveInfo(details[0], details[1], password.getText().toString());


                                            Toast.makeText(Login.this, "Sign in Successful", Toast.LENGTH_SHORT).show();
                                            Intent intent = new Intent(com.example.myrequestttt.Login.this, MainActivity.class);
                                            startActivity(intent);
                                            overridePendingTransition(android.R.anim.fade_in, android.R.anim.fade_out);
                                            finish();


                                        }

                                    }
                                }, new Consumer<Throwable>() {
                                    @Override
                                    public void accept(Throwable throwable) throws Exception {
//                                    Toast.makeText(GoogleService.this, "Server Error!", Toast.LENGTH_SHORT).show();
                                        Toast.makeText(getApplicationContext(),
                                                "error", Toast.LENGTH_SHORT).show();
                                    }
                                }
                        ));





            }
        });


    }
}
