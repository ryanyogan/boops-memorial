import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-[70vh] w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90 z-10" />
      <Image
        src="/eddy.jpg?height=1080&width=1920"
        alt="Edison hero image"
        fill
        priority
        className="object-cover animate-fade-in"
        sizes="100vw"
      />
      <div className="relative z-20 container flex flex-col items-center justify-center h-full text-center px-4 space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-neutral-800 drop-shadow-md">
          Remembering Edison
        </h1>
        <p className="text-lg md:text-xl text-neutral-900 max-w-2xl mx-auto drop-shadow-md">
          A beautiful life, filled with love, joy, and countless precious
          moments
        </p>
      </div>
    </section>
  );
}
