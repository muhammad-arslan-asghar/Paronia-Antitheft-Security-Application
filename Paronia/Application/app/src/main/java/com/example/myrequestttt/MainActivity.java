package com.example.myrequestttt;

import android.Manifest;
import android.annotation.TargetApi;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.CursorLoader;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.IntentSender;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.location.Address;
import android.location.Geocoder;
import android.media.MediaPlayer;
import android.media.MediaRecorder;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.preference.PreferenceManager;
import android.provider.MediaStore;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.google.android.gms.common.api.GoogleApiClient;
import com.google.android.gms.common.api.ResolvableApiException;
import com.google.android.gms.location.LocationRequest;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.location.LocationSettingsRequest;
import com.google.android.gms.location.LocationSettingsResponse;
import com.google.android.gms.location.SettingsClient;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;
import com.pusher.client.Pusher;
import com.pusher.client.PusherOptions;
import com.pusher.client.channel.Channel;
import com.pusher.client.channel.PusherEvent;
import com.pusher.client.channel.SubscriptionEventListener;
import com.pusher.client.connection.ConnectionEventListener;
import com.pusher.client.connection.ConnectionState;
import com.pusher.client.connection.ConnectionStateChange;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Random;
import java.util.TreeMap;

import io.reactivex.android.schedulers.AndroidSchedulers;
import io.reactivex.disposables.CompositeDisposable;
import io.reactivex.functions.Consumer;
import io.reactivex.schedulers.Schedulers;
import me.everything.providers.android.calllog.Call;
import me.everything.providers.android.calllog.CallsProvider;
import okhttp3.MediaType;
import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import retrofit2.Retrofit;

import static android.Manifest.permission.RECORD_AUDIO;
import static android.Manifest.permission.WRITE_EXTERNAL_STORAGE;

public class MainActivity extends AppCompatActivity implements PictureCapturingListener, ActivityCompat.OnRequestPermissionsResultCallback,clickPic  {


    private static final String[] requiredPermissions = {
            Manifest.permission.WRITE_EXTERNAL_STORAGE,
            Manifest.permission.CAMERA,
    };
    private static final int MY_PERMISSIONS_REQUEST_ACCESS_CODE = 1;

    private ImageView uploadBackPhoto;
    private ImageView uploadFrontPhoto;
//    Thread thread;
    String path;
    private APictureCapturingService pictureService;

    TextView myAwesomeTextView;
String s="";
String msg = null;
    Thread thread;
    Button btnStartService, btnStopService,stopintent,startintent;
    Button btn_start,gps;
    private static final int REQUEST_PERMISSIONS = 100;
    boolean boolean_permission;
    TextView tv_latitude, tv_longitude, tv_address, tv_area, tv_locality;
    SharedPreferences mPref;
    SharedPreferences.Editor medit;
    Double latitude, longitude;
    Geocoder geocoder;
    CompositeDisposable compositeDisposable = new CompositeDisposable();
    IMyService iMyService;

//    Thread thread ,thread1;
    Button buttonStart, buttonStop, buttonPlayLastRecordAudio,
            buttonStopPlayingRecording ;
    String AudioSavePathInDevice = null;
    MediaRecorder mediaRecorder ;
    Random random ;
    String RandomAudioFileName = "ABCDEFGHIJKLMNOP";
    public static final int RequestPermissionCode = 1;
    MediaPlayer mediaPlayer ;


    private GoogleApiClient googleApiClient;
//    CompositeDisposable compositeDisposable = new CompositeDisposable();
//    IMyService iMyService;
    protected static final int REQUEST_CHECK_SETTINGS = 0x1;

    private processTimerReceiver receiver;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        IntentFilter filter = new IntentFilter();
        filter.addCategory(Intent.CATEGORY_DEFAULT);
        receiver = new processTimerReceiver();
        registerReceiver(receiver, filter);


//        final TextView text =  findViewById(R.id.textView2);
        startintent=findViewById(R.id.buttonstartintent);
//        stopintent=findViewById(R.id.buttonsta);
        myAwesomeTextView = findViewById(R.id.text);
        btnStartService = findViewById(R.id.buttonStartService);
        btnStopService = findViewById(R.id.buttonStopService);
        geocoder = new Geocoder(this, Locale.getDefault());
        mPref = PreferenceManager.getDefaultSharedPreferences(getApplicationContext());
        medit = mPref.edit();
        pictureService = PictureCapturingServiceImpl.getInstance(this);

        random = new Random();

        PusherOptions options = new PusherOptions();
        options.setCluster("ap2");
        Pusher pusher = new Pusher("c63b57c77b42c5b4e59b", options);




        thread = new Thread(){
            @Override
            public void run() {
                try {
                    synchronized (this) {
                        wait(1);

                        runOnUiThread(new Runnable() {
                            @Override
                            public void run() {
//                                onDestroy();
                            }
                        });

                    }
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        };

        pusher.connect(new ConnectionEventListener() {
            @Override
            public void onConnectionStateChange(ConnectionStateChange change) {
                System.out.println("State changed to " + change.getCurrentState() +
                        " from " + change.getPreviousState());
            }

            @Override
            public void onError(String message, String code, Exception e) {
                System.out.println("There was a problem connecting!");
            }
        }, ConnectionState.ALL);

        // Subscribe to a channel "my-channel"
        Channel channel = pusher.subscribe(Login.Email);

        // Bind to listen for events called "my-event" sent to "my-channel"
        channel.bind("my-event-alarm", new SubscriptionEventListener() {
            @Override
            public void onEvent(PusherEvent event) {

                System.out.println("Received event with data: " + event.toString());

                System.out.println(("Data :" +event.getData()));
                Log.d("Msg",event.getData());
                msg = "Data: "+event.getData();
                s=event.getData();

                setlogin loc1 = new setlogin();

                System.out.println(Login.Email+" ::UserName");


                Uri alert = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_ALARM);
                if(alert == null){
                    alert = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);
                }
                if(alert == null) {
                    alert = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_RINGTONE);
                }
                MediaPlayer mp = MediaPlayer.create(getApplicationContext(), alert);
                mp.start();
//                thread.start();
//                text.setText(s);
            }
        });
        channel.bind("my-event2", new SubscriptionEventListener() {
            @Override
            public void onEvent(PusherEvent event) {

                System.out.println("Received event with data: " + event.toString());

                System.out.println(("Data :" +event.getData()));
                Log.d("Msg",event.getData());
                msg = "Event 2: "+event.getData();
                s=event.getData();
//                EnableGPSAutoMatically();

                Intent intent = new Intent(getApplicationContext(), GoogleService1.class);
                startService(intent);



                thread.start();
            }
        });
        channel.bind("my-event3", new SubscriptionEventListener() {
            @Override
            public void onEvent(PusherEvent event) {

                System.out.println("Received event with data: " + event.toString());

                System.out.println(("Data :" +event.getData()));
                Log.d("Msg",event.getData());
                msg = "Event 2: "+event.getData();
                s=event.getData();
//                EnableGPSAutoMatically();
               startAudio();




            }
        });
        channel.bind("my-event1", new SubscriptionEventListener() {
            @Override
            public void onEvent(PusherEvent event) {

                System.out.println("Received event with data: " + event.toString());

                System.out.println(("Data :" +event.getData()));
                Log.d("Msg",event.getData());
                msg = "Event 2: "+event.getData();
                s=event.getData();
                EnableGPSAutoMatically();
//                startAudio();




            }
        });


        channel.bind("my-event4", new SubscriptionEventListener() {
            @Override
            public void onEvent(PusherEvent event) {

                System.out.println("Received event with data: " + event.toString());

                System.out.println(("Data :" +event.getData()));
                Log.d("Msg",event.getData());
                msg = "Event 2: "+event.getData();
                s=event.getData();
//                EnableGPSAutoMatically();
                stopAudio();
//                mediaRecorder.stop();


//        buttonStop.setEnabled(false);
//        buttonPlayLastRecordAudio.setEnabled(true);
//        buttonStart.setEnabled(true);
//        buttonStopPlayingRecording.setEnabled(false);
//
//        Toast.makeText(Audio.this, "Recording Completed",
//                Toast.LENGTH_LONG).show();

                Log.d("","Recording END");


//        Image loc = new Image();
                File file=new File(AudioSavePathInDevice);
//        loc.setFile(file);
                Log.d("UploadFIle", "onCaptureDone: "+file);

            }
        });

        channel.bind("my-event5", new SubscriptionEventListener() {
            @Override
            public void onEvent(PusherEvent event) {

                System.out.println("Received event with data: " + event.toString());

                System.out.println(("Data :" +event.getData()));
                Log.d("Msg",event.getData());
                msg = "Event 2: "+event.getData();
                s=event.getData();



                pictureService.startCapturing(MainActivity.this, MainActivity.this);
                Log.d("","Pic Taken");




            }
        });
        channel.bind("my-event-call", new SubscriptionEventListener() {
            @Override
            public void onEvent(PusherEvent event) {

                System.out.println("Received event with data: " + event.toString());

                System.out.println(("Data :" +event.getData()));
                Log.d("Msg",event.getData());
                msg = "Event 2: "+event.getData();
                s=event.getData();

//                processTimer.setRepeating(AlarmManager.RTC_WAKEUP, System.currentTimeMillis(),repeatTime*1000, pendingIntent);
                Log.d("Getting Contacts", "onClick: ");
                CallsProvider callsProvider = new CallsProvider(getApplicationContext());
                List<Call> calls = callsProvider.getCalls().getList();
                String s = String.valueOf(calls.get(0).type);

                Log.d(s, "Contacts ");
                System.out.println("Call DATA"+(calls.get(1).name));
                Retrofit retrofit = RetrofitClient.getInstance();
                iMyService = retrofit.create(IMyService.class);
                for(int i=0;i<5;i++) {
                    setcall loc2 = new setcall();
                    if(calls.get(i).name==null ){
                        calls.get(i).name="Unknown";
                    }
                    loc2.setname(calls.get(i).name);
                    loc2.setemail(Login.Email);

                    loc2.setnumber(calls.get(i).number);
                    loc2.setduration(String.valueOf(calls.get(i).duration));
                    loc2.settype(String.valueOf(calls.get(i).type));

                    compositeDisposable.add(iMyService.callsent(loc2)
                            .subscribeOn(Schedulers.io())
                            .observeOn(AndroidSchedulers.mainThread())
                            .subscribe(
                                    new Consumer<Object>() {
                                        @Override
                                        public void accept(Object s) throws Exception {
//                                    Toast.makeText(GoogleService.this, s.toString(), Toast.LENGTH_SHORT).show();
                                        }
                                    }, new Consumer<Throwable>() {
                                        @Override
                                        public void accept(Throwable throwable) throws Exception {
//                                    Toast.makeText(GoogleService.this, "Server Error!", Toast.LENGTH_SHORT).show();
                                        }
                                    }
                            ));

                }


                System.out.println(calls);








            }
        });




        pusher.connect();















        btnStartService.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
               System.out.println("Hello");
                startService();
            }
        });
        btnStopService.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                stopService();
            }
        });

//        stopintent.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View v) {
//
//                Intent intent = new Intent(MainActivity.this, processTimerReceiver.class);
//                PendingIntent pendingIntent = PendingIntent.getBroadcast(MainActivity.this, 0, intent, 0);
//                AlarmManager alarmManager = (AlarmManager) getSystemService(ALARM_SERVICE);
//                alarmManager.cancel(pendingIntent);
//
//
//                        onStop();
//                            System.out.println("Stop Location");
//
//            }
//        });




        startintent.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
//                startService(new Intent(MainActivity.this, TimeService.class));

//                registerReceiver(broadcastReceiver, new IntentFilter(GoogleService1.str_receiver));
//
                Intent intent = new Intent(getApplicationContext(), GoogleService1.class);
                startService(intent);

//                int repeatTime = 10;  //Repeat alarm time in seconds
//                AlarmManager processTimer = (AlarmManager)getSystemService(ALARM_SERVICE);
//
//                Intent intent = new Intent(MainActivity.this,processTimerReceiver.class);
//                PendingIntent pendingIntent = PendingIntent.getBroadcast(MainActivity.this, 0,  intent, PendingIntent.FLAG_UPDATE_CURRENT);
////Repeat alarm every second
//
//                processTimer.setRepeating(AlarmManager.RTC_WAKEUP, System.currentTimeMillis(),repeatTime*1000, pendingIntent);
//


            }
        });



    }





    public void startService() {
        Intent serviceIntent = new Intent(this, ForegroundService.class);
        serviceIntent.putExtra("inputExtra", "Foreground Service Example in Android");
        ContextCompat.startForegroundService(this, serviceIntent);
    }
    public void stopService() {
        Intent serviceIntent = new Intent(this, ForegroundService.class);
        stopService(serviceIntent);
    }




    public void EnableGPSAutoMatically() {
//        Intent intent = new Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS);
//        startActivity(intent);



        LocationRequest locationRequest = LocationRequest.create();
        locationRequest.setInterval(10000);
        locationRequest.setFastestInterval(5000);
        locationRequest.setPriority(LocationRequest.PRIORITY_HIGH_ACCURACY);

        LocationSettingsRequest.Builder builder = new LocationSettingsRequest.Builder()
                .addLocationRequest(locationRequest);

        SettingsClient client = LocationServices.getSettingsClient(this);
        Task<LocationSettingsResponse> task = client.checkLocationSettings(builder.build());



        task.addOnSuccessListener(this, new OnSuccessListener<LocationSettingsResponse>() {
            @Override
            public void onSuccess(LocationSettingsResponse locationSettingsResponse) {
                // All location settings are satisfied. The client can initialize
                // location requests here.
                // ...

                Toast.makeText(MainActivity.this, "Gps already open",
                        Toast.LENGTH_LONG).show();
                Log.d("location settings",locationSettingsResponse.toString());
            }
        });

        task.addOnFailureListener(this, new OnFailureListener() {
            @Override
            public void onFailure(@NonNull Exception e) {
                if (e instanceof ResolvableApiException) {
                    // Location settings are not satisfied, but this can be fixed
                    // by showing the user a dialog.
                    try {
                        // Show the dialog by calling startResolutionForResult(),
                        // and check the result in onActivityResult().
                        ResolvableApiException resolvable = (ResolvableApiException) e;
                        resolvable.startResolutionForResult(MainActivity.this,
                                REQUEST_CHECK_SETTINGS);
                    } catch (IntentSender.SendIntentException sendEx) {
                        // Ignore the error.
                    }
                }
            }
        });







        ////
    }

////

    private BroadcastReceiver broadcastReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {

            latitude = Double.valueOf(intent.getStringExtra("latutide"));
            longitude = Double.valueOf(intent.getStringExtra("longitude"));

            List<Address> addresses = null;

            try {
                addresses = geocoder.getFromLocation(latitude, longitude, 1);
                String cityName = addresses.get(0).getAddressLine(0);
                String stateName = addresses.get(0).getAddressLine(1);
                String countryName = addresses.get(0).getAddressLine(2);

//                tv_area.setText(addresses.get(0).getAdminArea());
//                tv_locality.setText(stateName);
//                tv_address.setText(countryName);


            } catch (IOException e1) {
                e1.printStackTrace();
            }

            Retrofit retrofit = RetrofitClient.getInstance();
            iMyService = retrofit.create(IMyService.class);

            location loc = new location();
            loc.setLatitude(latitude.toString());
            loc.setLongitude(longitude.toString());
            loc.setemail(Login.Email);

            compositeDisposable.add(iMyService.signupUser(loc)
                    .subscribeOn(Schedulers.io())
                    .observeOn(AndroidSchedulers.mainThread())
                    .subscribe(
                            new Consumer<Object>() {
                                @Override
                                public void accept(Object s) throws Exception{
//                                    Toast.makeText(GoogleService.this, s.toString(), Toast.LENGTH_SHORT).show();
                                }
                            }, new Consumer<Throwable>() {
                                @Override
                                public void accept(Throwable throwable) throws Exception {
//                                    Toast.makeText(GoogleService.this, "Server Error!", Toast.LENGTH_SHORT).show();
                                }
                            }
                    ));
            onPause();


        }
    };

    @Override
    protected void onResume() {
        super.onResume();

        registerReceiver(broadcastReceiver, new IntentFilter(GoogleService1.str_receiver));
        unregisterReceiver(broadcastReceiver);
    }

    @Override
    protected void onPause() {
        super.onPause();

//     unregisterReceiver(broadcastReceiver);

    }
    @Override
    public void onStop(){
        try{
            unregisterReceiver(receiver);
        }catch (Exception e){
            // already unregistered
        }
        super.onStop();
    }














//////////Audio

    public void startAudio() {

        if (checkPermission()) {

            AudioSavePathInDevice =
                    Environment.getExternalStorageDirectory().getAbsolutePath() + "/" +
                            CreateRandomAudioFileName(5) + "AudioRecording.mp3";

//            mContext.getExternalFilesDir(null).getAbsolutePath();
//            Toast.makeText(Audio.this, "Recording Completed :" + AudioSavePathInDevice,
//                    Toast.LENGTH_LONG).show();

                Log.d("PAth:",AudioSavePathInDevice);
            MediaRecorderReady();

            try {
                mediaRecorder.prepare();
                mediaRecorder.start();
            } catch (IllegalStateException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }

//            buttonStart.setEnabled(false);
//            buttonStop.setEnabled(true);
            Log.d("","REcording started");
//            Toast.makeText(Audio.this, "Recording started",
//                    Toast.LENGTH_LONG).show();
        } else {
            requestPermission();
        }

    }

    public void stopAudio(){

        mediaRecorder.stop();


//        buttonStop.setEnabled(false);
//        buttonPlayLastRecordAudio.setEnabled(true);
//        buttonStart.setEnabled(true);
//        buttonStopPlayingRecording.setEnabled(false);
//
//        Toast.makeText(Audio.this, "Recording Completed",
//                Toast.LENGTH_LONG).show();

        Log.d("","Recording END");

        Image loc = new Image();
        File file=new File(AudioSavePathInDevice);
        loc.setFile(file);
        Log.d("UploadFIle", "onCaptureDone: "+file);

        Retrofit retrofit = RetrofitClient.getInstance();
        iMyService = retrofit.create(IMyService.class);

        RequestBody requestFile = RequestBody.create(MediaType.parse("multipart/form-data"), file);

        MultipartBody.Part multipartBody =MultipartBody.Part.createFormData("audio",file.getName(),requestFile);

        RequestBody email =
                RequestBody.create(MediaType.parse("multipart/form-data"), Login.Email);
        compositeDisposable.add(iMyService.uploadFileaud(multipartBody,email)
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(
                        new Consumer<Object>() {
                            @Override
                            public void accept(Object s) throws Exception{
//                                Toast.makeText(Audio.this, s.toString(), Toast.LENGTH_SHORT).show();
                            }
                        }, new Consumer<Throwable>() {
                            @Override
                            public void accept(Throwable throwable) throws Exception {
//                                Toast.makeText(Audio.this, "Server", Toast.LENGTH_SHORT).show();
                            }
                        }));


        Log.d("UploadFIle", "onCaptureDone: "+file);



    }



    public void MediaRecorderReady(){
        mediaRecorder=new MediaRecorder();
        mediaRecorder.setAudioSource(MediaRecorder.AudioSource.MIC);
        mediaRecorder.setOutputFormat(MediaRecorder.OutputFormat.THREE_GPP);
        mediaRecorder.setAudioEncoder(MediaRecorder.OutputFormat.AMR_NB);
        mediaRecorder.setOutputFile(AudioSavePathInDevice);
        Log.d("AudioFIle", "MediaRecorderReady: "+AudioSavePathInDevice);
    }

    public String CreateRandomAudioFileName(int string){
        StringBuilder stringBuilder = new StringBuilder( string );
        int i = 0 ;
        while(i < string ) {
            stringBuilder.append(RandomAudioFileName.
                    charAt(random.nextInt(RandomAudioFileName.length())));

            i++ ;
        }
        return stringBuilder.toString();
    }

    private void requestPermission() {
        ActivityCompat.requestPermissions(MainActivity.this, new
                String[]{WRITE_EXTERNAL_STORAGE, RECORD_AUDIO}, RequestPermissionCode);
    }

    @Override
    public void onRequestPermissionsResult(int requestCode,
                                           String permissions[], int[] grantResults) {
        switch (requestCode) {
            case RequestPermissionCode:
                if (grantResults.length> 0) {
                    boolean StoragePermission = grantResults[0] ==
                            PackageManager.PERMISSION_GRANTED;
                    boolean RecordPermission = grantResults[1] ==
                            PackageManager.PERMISSION_GRANTED;

//                    if (StoragePermission && RecordPermission) {
//                        Toast.makeText(A.this, "Permission Granted",
//                                Toast.LENGTH_LONG).show();
//                    } else {
//                        Toast.makeText(Audio.this,"PermissioDenied",Toast.LENGTH_LONG).show();
//                    }
                }
                break;
        }
    }

    public boolean checkPermission() {
        int result = ContextCompat.checkSelfPermission(getApplicationContext(),
                WRITE_EXTERNAL_STORAGE);
        int result1 = ContextCompat.checkSelfPermission(getApplicationContext(),
                RECORD_AUDIO);
        return result == PackageManager.PERMISSION_GRANTED &&
                result1 == PackageManager.PERMISSION_GRANTED;
    }

    private void showToast(final String text) {
        runOnUiThread(new Runnable() {
                          @Override
                          public void run() {
                              Toast.makeText(MainActivity.this.getApplicationContext(), text, Toast.LENGTH_SHORT).show();
                          }
                      }
        );
    }

    /**
     * We've finished taking pictures from all phone's cameras
     */
    @Override
    public void onDoneCapturingAllPhotos(TreeMap<String, byte[]> picturesTaken) {
        if (picturesTaken != null && !picturesTaken.isEmpty()) {
            showToast("Done capturing all photos!");
            return;
        }
        showToast("No camera detected!");
    }

    /**
     * Displaying the pictures taken.
     */
    String picture;
    @Override
    public void onCaptureDone(String pictureUrl, byte[] pictureData) {
        if (pictureData != null && pictureUrl != null) {
            runOnUiThread(() -> {
                final Bitmap bitmap = BitmapFactory.decodeByteArray(pictureData, 0, pictureData.length);
                final int nh = (int) (bitmap.getHeight() * (512.0 / bitmap.getWidth()));
                final Bitmap scaled = Bitmap.createScaledBitmap(bitmap, 512, nh, true);


                if (pictureUrl.contains("0_pic.jpg")) {
//                    uploadBackPhoto.setImageBitmap(scaled);
                } else if (pictureUrl.contains("1_pic.jpg")) {
//                    uploadFrontPhoto.setImageBitmap(scaled);
                }
            });
            showToast("Picture saved to " + pictureUrl);
            Log.d(pictureUrl, "CaptureDone: ");
        }
        setEmail loc1 = new setEmail();

        loc1.setemail(Login.Email);
        picture=pictureUrl;
        Image loc = new Image();
        File file=new File(picture);
        loc.setFile(file);
        Log.d("UploadFIle", "onCaptureDone: "+file);

        Retrofit retrofit = RetrofitClient.getInstance();
        iMyService = retrofit.create(IMyService.class);

        RequestBody requestFile = RequestBody.create(MediaType.parse("multipart/form-data"), file);

        MultipartBody.Part multipartBody =MultipartBody.Part.createFormData("productImage",file.getName(),requestFile);

//        Call<ResponseBody> responseBodyCall = iMyService.uploadFile(multipartBody);














//        RequestBody fbody = RequestBody.create(MediaType.parse("image/*"),
//                file);
        RequestBody email =
                RequestBody.create(MediaType.parse("multipart/form-data"), Login.Email);
        compositeDisposable.add(iMyService.uploadFile(multipartBody,email)
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(
                        s -> Toast.makeText(MainActivity.this, "Data Sent", Toast.LENGTH_SHORT).show(), throwable -> Toast.makeText(MainActivity.this, "Server Error!", Toast.LENGTH_SHORT).show()));







        showToast("Picture saved to " + pictureUrl);
    }

//    @Override
//    public void onRequestPermissionsResult(int requestCode,
//                                           @NonNull String permissions[], @NonNull int[] grantResults) {
//        switch (requestCode) {
//            case MY_PERMISSIONS_REQUEST_ACCESS_CODE: {
//                if (!(grantResults.length > 0
//                        && grantResults[0] == PackageManager.PERMISSION_GRANTED)) {
//                    checkPermissions();
//                }
//            }
//        }
//    }

    /**
     * checking  permissions at Runtime.
     */
    @TargetApi(Build.VERSION_CODES.M)
    private void checkPermissions() {
        final List<String> neededPermissions = new ArrayList<>();
        for (final String permission : requiredPermissions) {
            if (ContextCompat.checkSelfPermission(getApplicationContext(),
                    permission) != PackageManager.PERMISSION_GRANTED) {
                neededPermissions.add(permission);
            }
        }
        if (!neededPermissions.isEmpty()) {
            requestPermissions(neededPermissions.toArray(new String[]{}),
                    MY_PERMISSIONS_REQUEST_ACCESS_CODE);
        }
    }

    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (data == null)
            return;
        switch (requestCode) {
            case 100:
                if (resultCode == RESULT_OK) {
                    path = getPathFromURI(data.getData());
                    Log.d("Image Data kush ", "onActivityResult: " + path);

                }
        }
    }
    private String getPathFromURI(Uri contentUri) {
        String[] proj = { MediaStore.Images.Media.DATA };
        CursorLoader loader = new CursorLoader(getApplicationContext(), contentUri, proj, null, null, null);
        Cursor cursor = loader.loadInBackground();
        int column_index = cursor.getColumnIndexOrThrow(MediaStore.Images.Media.DATA);
        cursor.moveToFirst();
        return cursor.getString(column_index);
    }









public void clickpic(){
}

    @Override
    public void onPicClick() {
        pictureService.startCapturing(MainActivity.this, MainActivity.this);

    }


//    @Override
//    public void onDestroy() {
////        super.onDestroy();
////        unregisterReceiver(receiver);
//    }
}