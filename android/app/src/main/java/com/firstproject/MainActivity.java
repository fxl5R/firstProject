package com.firstProject;

import com.facebook.react.ReactActivity;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

import java.util.Arrays;
import java.util.List;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import org.pgsqlite.SQLitePluginPackage;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    protected String getMainComponentName() {
        return "firstProject";
    }

	protected ReactActivityDelegate createReactActivityDelegate(){
		return new ReactActivityDelegate(this,getMainComponentName()){

			protected ReactRootView creatRootView(){
				return new RNGestureHandlerEnabledRootView(MainActivity.this);
			}
		};
	}
    protected List<ReactPackage> createAdditionalReactPackages() {
         return getPackages();
    }
	protected List<ReactPackage> getPackages(){
	    return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new RNGestureHandlerPackage(),
	        new SQLitePluginPackage()
	    );
	}

}
