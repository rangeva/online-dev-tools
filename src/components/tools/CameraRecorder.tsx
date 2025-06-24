
import { useState, useRef, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Video, Square, Download, Play, Pause } from "lucide-react";

const CameraRecorder = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [isStreamActive, setIsStreamActive] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [recordedVideo, setRecordedVideo] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startCamera = useCallback(async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreamActive(true);
      }
    } catch (err) {
      setError("Could not access camera. Please ensure camera permissions are granted.");
      console.error("Error accessing camera:", err);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsStreamActive(false);
    }
  }, []);

  const takePicture = useCallback(() => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      
      if (context) {
        context.drawImage(videoRef.current, 0, 0);
        const imageDataUrl = canvas.toDataURL('image/png');
        setCapturedImage(imageDataUrl);
      }
    }
  }, []);

  const startRecording = useCallback(() => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      const chunks: Blob[] = [];
      setRecordedChunks(chunks);
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const videoUrl = URL.createObjectURL(blob);
        setRecordedVideo(videoUrl);
        setRecordedChunks(chunks);
      };
      
      mediaRecorder.start();
      setIsRecording(true);
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  }, [isRecording]);

  const downloadImage = useCallback(() => {
    if (capturedImage) {
      const link = document.createElement('a');
      link.download = `camera-photo-${Date.now()}.png`;
      link.href = capturedImage;
      link.click();
    }
  }, [capturedImage]);

  const downloadVideo = useCallback(() => {
    if (recordedVideo) {
      const link = document.createElement('a');
      link.download = `camera-video-${Date.now()}.webm`;
      link.href = recordedVideo;
      link.click();
    }
  }, [recordedVideo]);

  return (
    <div className="p-6 space-y-6">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
          Camera Recorder
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Take pictures or record videos from your webcam or camera.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Camera Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="w-5 h-5" />
              Camera
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden" style={{ aspectRatio: '16/9' }}>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
                style={{ display: isStreamActive ? 'block' : 'none' }}
              />
              {!isStreamActive && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Camera className="w-12 h-12 mx-auto mb-4 text-slate-400" />
                    <p className="text-slate-500 dark:text-slate-400">Camera not active</p>
                  </div>
                </div>
              )}
            </div>

            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-md">
                <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
              </div>
            )}

            <div className="flex gap-2">
              {!isStreamActive ? (
                <Button onClick={startCamera} className="flex-1">
                  <Play className="w-4 h-4 mr-2" />
                  Start Camera
                </Button>
              ) : (
                <Button onClick={stopCamera} variant="outline" className="flex-1">
                  <Pause className="w-4 h-4 mr-2" />
                  Stop Camera
                </Button>
              )}
            </div>

            {isStreamActive && (
              <div className="flex gap-2">
                <Button onClick={takePicture} variant="outline" className="flex-1">
                  <Camera className="w-4 h-4 mr-2" />
                  Take Photo
                </Button>
                {!isRecording ? (
                  <Button onClick={startRecording} variant="outline" className="flex-1">
                    <Video className="w-4 h-4 mr-2" />
                    Start Recording
                  </Button>
                ) : (
                  <Button onClick={stopRecording} variant="destructive" className="flex-1">
                    <Square className="w-4 h-4 mr-2" />
                    Stop Recording
                  </Button>
                )}
              </div>
            )}

            <div className="text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 p-3 rounded-md">
              <strong>Instructions:</strong>
              <ul className="mt-2 space-y-1">
                <li>• Click "Start Camera" to access your webcam</li>
                <li>• Use "Take Photo" to capture an image</li>
                <li>• Use "Start Recording" to record a video</li>
                <li>• Download your captured media from the preview section</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Preview Section */}
        <Card>
          <CardHeader>
            <CardTitle>Captured Media</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {capturedImage && (
              <div>
                <h3 className="font-medium mb-2">Captured Photo</h3>
                <div className="relative">
                  <img 
                    src={capturedImage} 
                    alt="Captured" 
                    className="w-full rounded-lg border"
                  />
                  <Button 
                    onClick={downloadImage}
                    className="absolute top-2 right-2"
                    size="sm"
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            )}

            {recordedVideo && (
              <div>
                <h3 className="font-medium mb-2">Recorded Video</h3>
                <div className="relative">
                  <video 
                    src={recordedVideo} 
                    controls 
                    className="w-full rounded-lg border"
                  />
                  <Button 
                    onClick={downloadVideo}
                    className="absolute top-2 right-2"
                    size="sm"
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            )}

            {!capturedImage && !recordedVideo && (
              <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                <Camera className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No media captured yet</p>
                <p className="text-sm">Take a photo or record a video to see it here</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CameraRecorder;
