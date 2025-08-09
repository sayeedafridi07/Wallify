package com.wallify

import android.app.WallpaperManager
import android.graphics.Bitmap
import android.os.Build
import com.facebook.react.bridge.*
import com.bumptech.glide.Glide
import com.bumptech.glide.request.target.CustomTarget
import com.bumptech.glide.request.transition.Transition
import java.io.IOException

class WallpaperModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    companion object {
        private const val MODULE_NAME = "WallpaperManager"
    }

    override fun getName(): String {
        return MODULE_NAME
    }

    @ReactMethod
    fun setWallpaper(imageUrl: String, type: String, promise: Promise) {
        try {
            val wallpaperManager = WallpaperManager.getInstance(reactContext)
            
            Glide.with(reactContext)
                .asBitmap()
                .load(imageUrl)
                .into(object : CustomTarget<Bitmap>() {
                    override fun onResourceReady(resource: Bitmap, transition: Transition<in Bitmap>?) {
                        try {
                            val result = Arguments.createMap()
                            
                            when (type.lowercase()) {
                                "home" -> {
                                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
                                        wallpaperManager.setBitmap(resource, null, true, WallpaperManager.FLAG_SYSTEM)
                                    } else {
                                        wallpaperManager.setBitmap(resource)
                                    }
                                    result.putString("status", "success")
                                    result.putString("message", "Home wallpaper set successfully")
                                }
                                "lock" -> {
                                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
                                        wallpaperManager.setBitmap(resource, null, true, WallpaperManager.FLAG_LOCK)
                                        result.putString("status", "success")
                                        result.putString("message", "Lock screen wallpaper set successfully")
                                    } else {
                                        result.putString("status", "error")
                                        result.putString("message", "Lock screen wallpaper requires Android 7.0+")
                                    }
                                }
                                "both" -> {
                                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
                                        wallpaperManager.setBitmap(
                                            resource, null, true,
                                            WallpaperManager.FLAG_SYSTEM or WallpaperManager.FLAG_LOCK
                                        )
                                    } else {
                                        wallpaperManager.setBitmap(resource)
                                    }
                                    result.putString("status", "success")
                                    result.putString("message", "Wallpaper set for both screens successfully")
                                }
                                else -> {
                                    result.putString("status", "error")
                                    result.putString("message", "Invalid wallpaper type")
                                }
                            }
                            
                            promise.resolve(result)
                            
                        } catch (e: IOException) {
                            val errorResult = Arguments.createMap()
                            errorResult.putString("status", "error")
                            errorResult.putString("message", "Failed to set wallpaper: ${e.message}")
                            promise.resolve(errorResult)
                        }
                    }

                    override fun onLoadCleared(placeholder: android.graphics.drawable.Drawable?) {
                        // Handle cleanup if needed
                    }
                    
                    override fun onLoadFailed(errorDrawable: android.graphics.drawable.Drawable?) {
                        val errorResult = Arguments.createMap()
                        errorResult.putString("status", "error")
                        errorResult.putString("message", "Failed to load image")
                        promise.resolve(errorResult)
                    }
                })
                
        } catch (e: Exception) {
            val errorResult = Arguments.createMap()
            errorResult.putString("status", "error")
            errorResult.putString("message", "Error: ${e.message}")
            promise.resolve(errorResult)
        }
    }
}
