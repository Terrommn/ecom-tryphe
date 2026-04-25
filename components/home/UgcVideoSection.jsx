"use client";

import { useState, useRef, useEffect, useCallback, createContext, useContext } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

const VIDEOS = [
  { src: "/videos/ugc-01.mp4", poster: "/videos/ugc-01-poster.jpg" },
  { src: "/videos/ugc-02.mp4", poster: "/videos/ugc-02-poster.jpg" },
  { src: "/videos/ugc-03.mp4", poster: "/videos/ugc-03-poster.jpg" },
];

const UnmuteContext = createContext();

function VideoCard({ src, poster, index }) {
  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const ref = useRef(null);
  const { unmutedIndex, requestUnmute } = useContext(UnmuteContext);
  const isMuted = unmutedIndex !== index;

  // Sync muted state to video element
  useEffect(() => {
    if (ref.current) ref.current.muted = isMuted;
  }, [isMuted]);

  // Intersection observer: auto play/pause based on visibility
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().then(() => setPlaying(true)).catch(() => {});
        } else {
          video.pause();
          setPlaying(false);
          // Auto-mute when leaving viewport
          if (!isMuted) requestUnmute(-1);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [isMuted, requestUnmute]);

  function togglePlay() {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      v.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      v.pause();
      setPlaying(false);
    }
  }

  function toggleMute() {
    requestUnmute(isMuted ? index : -1);
  }

  return (
    <div className="group relative aspect-[9/16] overflow-hidden bg-neutral-200">
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-neutral-200 via-neutral-300 to-neutral-200" />
      )}
      <video
        ref={ref}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        onLoadedData={() => setLoaded(true)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className={`h-full w-full object-cover transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Controls overlay — visible on hover / tap */}
      {loaded && (
        <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 p-3 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={togglePlay}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white transition-colors hover:bg-white/40"
            aria-label={playing ? "Pausar" : "Reproducir"}
          >
            {playing ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
          </button>
          <button
            onClick={toggleMute}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white transition-colors hover:bg-white/40"
            aria-label={isMuted ? "Activar sonido" : "Silenciar"}
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
        </div>
      )}
    </div>
  );
}

export function UgcVideoSection() {
  // -1 means all muted; 0/1/2 means that index is unmuted
  const [unmutedIndex, setUnmutedIndex] = useState(-1);
  const requestUnmute = useCallback((idx) => setUnmutedIndex(idx), []);

  return (
    <UnmuteContext.Provider value={{ unmutedIndex, requestUnmute }}>
      <section className="bg-[#faf9f7] py-16 md:py-24">
        <div className="mx-auto max-w-screen-xl px-4 md:px-10">
          <div className="mb-10 text-center" data-gsap="fade-up">
            <p className="text-[9px] font-bold tracking-[0.4em] text-neutral-500 uppercase">
              Comunidad TRYPHÉ
            </p>
            <h3 className="mt-4 font-serif text-2xl font-medium text-neutral-950 md:text-3xl">
              Así se vive TRYPHÉ
            </h3>
          </div>
          <div
            className="grid grid-cols-3 gap-3 md:gap-5"
            data-gsap="scale-in"
            data-gsap-stagger="0.1"
          >
            {VIDEOS.map((v, i) => (
              <VideoCard key={i} src={v.src} poster={v.poster} index={i} />
            ))}
          </div>
        </div>
      </section>
    </UnmuteContext.Provider>
  );
}
