package com.tothesea;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map.Entry;
import java.util.Random;

import android.app.Activity;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AlertDialog;
import android.util.Log;
import android.view.MotionEvent;
import android.view.View;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.widget.Button;

public class MainActivity extends Activity {
	
	public Context context;
	private WebView webView;
	public MyWebViewClient myClient;
	
	private static String TAG = "MA";
	private Random random;

	public Button btnDrive, btnWant, btnPay, btnMe;
	
	private HashMap<String, String> storageDB;
	private int id;
	
	private View.OnTouchListener onBottomButtonTouchListener;
	

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
		
		createInternal();
		
		webView = (WebView) findViewById(R.id.webView);
		btnDrive = (Button) findViewById(R.id.btnDrive);
		btnWant = (Button) findViewById(R.id.btnWant);
		btnPay = (Button) findViewById(R.id.btnPay);
		btnMe = (Button) findViewById(R.id.btnMe);
		
		myClient = new MyWebViewClient();
		random = new Random();
		
		context = this;
		
		setupButtons();
	    
	    WebSettings webSettings = webView.getSettings();
	    webSettings.setJavaScriptEnabled(true);
	    

	    connectToMap();
	}
	
	@Override
	protected void onActivityResult(int requestCode, int resultCode, Intent data) {
		if(data == null) return;
		String name = data.getStringExtra("name");
		String phone = data.getStringExtra("phone");
		String selectedDis = data.getStringExtra("selectedDis");
		Log.v(TAG, "OnActRes");
	}
	
	private void setupButtons() {
		btnPay.setBackgroundColor(getResources().getColor(R.color.blue));
		btnDrive.setBackgroundColor(getResources().getColor(R.color.blue));
		btnWant.setBackgroundColor(getResources().getColor(R.color.blue));
		btnMe.setBackgroundColor(getResources().getColor(R.color.blue));
		
		onBottomButtonTouchListener = new View.OnTouchListener() {
			@Override
			public boolean onTouch(View view, MotionEvent event) {
				if(event.getAction() == MotionEvent.ACTION_DOWN)
					view.setBackgroundColor(getResources().getColor(R.color.darkblue));
					//startMyInformaion();
				if(view == btnMe) {
					AlertDialog.Builder builder = new AlertDialog.Builder(MainActivity.this);
					builder.setTitle("Информация о Вас")
							.setMessage("Вы самый классный.")
							.setIcon(R.drawable.ic_cartman)
							.setCancelable(false)
							.setNegativeButton("Хех :3",
									new DialogInterface.OnClickListener() {
										public void onClick(DialogInterface dialog, int id) {
											dialog.cancel();
										}
									});
					AlertDialog alert = builder.create();
					alert.show();
				} else if(view == btnPay) {
					AlertDialog.Builder builder = new AlertDialog.Builder(MainActivity.this);
					builder.setTitle("Благодарим")
							.setMessage("Спасибо! Вы делаете мир теплее.")
							.setCancelable(false)
							.setNegativeButton("Ок",
									new DialogInterface.OnClickListener() {
										public void onClick(DialogInterface dialog, int id) {
											dialog.cancel();
										}
									});
					AlertDialog alert = builder.create();
					alert.show();
				}
				if(event.getAction() == MotionEvent.ACTION_UP)
					view.setBackgroundColor(getResources().getColor(R.color.blue));
				return true;
			}
		};
		
		btnPay.setOnTouchListener(onBottomButtonTouchListener);
		btnDrive.setOnTouchListener(onBottomButtonTouchListener);
		btnWant.setOnTouchListener(onBottomButtonTouchListener);
		btnMe.setOnTouchListener(onBottomButtonTouchListener);
		
		readFromStorage();
		
		Log.v(TAG, "storageDB " + storageDB.toString());
		for(Entry<String, String> entry : storageDB.entrySet()) {
			if(entry.getKey() == "id")
				id = Integer.parseInt(entry.getValue());
				Log.v(TAG, "id = " + id);
		}
		
		/*webView.setOnTouchListener(new View.OnTouchListener() {
			
			@Override
			public boolean onTouch(View view, MotionEvent event) {
				
				if(id == 0){
					id = random.nextInt(1000) + 2;
					Intent intent = new Intent(context, MyInformaionActivity.class);
					startActivity(intent);
					Log.v(TAG, "new id = " + id);
					webView.setOnTouchListener(null);
				}
				return true;
			}
		});*/
		
	}

	public void connectToMap() {
		webView.setWebViewClient(myClient);
		webView.loadUrl("http://namore.nektobit.ru");
	}
	
	public void startMyInformaion() {
		Intent intent = new Intent(context, MyInformaionActivity.class);
		startActivity(intent);
	}
	
	private void switchBool(boolean b) {
		b = !b;
	}
	
	private void readFromStorage() {
		String temp = "";
		
		try {
			FileInputStream fIn = openFileInput("database");
			int c;
			while((c = fIn.read()) != -1){
				temp = temp + Character.toString((char)c);
			}
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		storageDB = parseStorageString(temp);
	}
	
	private void createInternal() {
		FileOutputStream fOut;
		try {
			fOut = openFileOutput("database", MODE_PRIVATE);
			try {
				fOut.write("id:0;".getBytes());
				fOut.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
	}
	
	private void putIntoInternal(String data) {
		FileOutputStream fOut;
		try {
			fOut = openFileOutput("database", MODE_APPEND);
			try {
				fOut.write(data.getBytes());
				fOut.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
		
	}
	
	public HashMap<String, String> parseStorageString(String str) {
		HashMap<String, String> finalMap = new HashMap<String, String>();
		String[] pairs = str.split(";");
		for(String pair : pairs) {
			finalMap.put(pair.split(":")[0], pair.split(":")[1]);
		}
		return finalMap;		
	}
}
