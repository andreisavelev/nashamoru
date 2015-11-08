package com.tothesea;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.HashMap;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;

public class MyInformaionActivity extends Activity implements OnClickListener {

	private Context context;
	private HashMap<String, String> storageDB;
	
	EditText name, phone;
	Spinner disSpinner;
	Button btnOk;
	
	private static String TAG = "MA";
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_my_informaion);
		
		name = (EditText) findViewById(R.id.name);
		phone = (EditText) findViewById(R.id.phone);
		disSpinner = (Spinner) findViewById(R.id.disSpinner);	
		btnOk = (Button) findViewById(R.id.btnOk);
		
		btnOk.setOnClickListener(this);
		
		context = this;
	}

	@Override
	public void onClick(View view) {
		putIntoInternal("name:" + name.getText().toString() + ";");
		putIntoInternal("phone:" + phone.getText().toString() + ";");
		putIntoInternal("selectedDis:" + disSpinner.getSelectedItem().toString() + ";");		
		Log.v(TAG, "Button cick");
		readFromStorage();
		Log.v(TAG, storageDB.toString());
		
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
