"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import type { SectionProps } from "../types"
import Image from "next/image"
import { Github } from "lucide-react"

export default function Section({
  id,
  title,
  subtitle,
  content,
  isActive,
  showButton,
  buttonText,
  image,
}: SectionProps) {
  const isHero = id === "hero"

  return (
    <section id={id} className="relative h-screen w-full snap-start flex flex-col justify-center p-8 md:p-16 lg:p-24">
      <div className="flex flex-col md:flex-row md:items-center md:gap-12 lg:gap-16 max-w-7xl mx-auto w-full">
        <div className="flex-1 order-2 md:order-1">
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.1] tracking-tight text-white"
            initial={{ opacity: 0, y: 50 }}
            animate={isActive ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            {title}
          </motion.h2>
          {content && (
            <motion.p
              className="text-base md:text-lg lg:text-xl max-w-2xl mt-4 md:mt-6 text-neutral-300 leading-relaxed font-[100] [font-family:'Helvetica_Now_Thin',_sans-serif]"
              initial={{ opacity: 0, y: 50 }}
              animate={isActive ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {content}
            </motion.p>
          )}
          {showButton && isHero && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isActive ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-6 md:mt-8 flex flex-wrap gap-4"
            >
              <Button
                size="lg"
                className="bg-white text-black hover:bg-neutral-200 transition-colors rounded-full px-8 text-base font-[100] [font-family:'Helvetica_Now_Thin',_sans-serif]"
              >
                <Github className="mr-2 h-5 w-5" />
                Github
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-white bg-transparent border-2 border-white hover:bg-white hover:text-black transition-colors rounded-full px-8 text-base font-[100] [font-family:'Helvetica_Now_Thin',_sans-serif]"
              >
                Buy $GTZ
              </Button>
              <div className="flex items-center gap-6 ml-4">
                <Image
                  src="https://images.ctfassets.net/18izrhn535ym/5u64tB9rH9SOzi3K3PHTWM/a63c7e43c34447a6f1ed65a5055f62bb/PS4_Logo_Full_KO.svg"
                  alt="PlayStation 4"
                  width={60}
                  height={40}
                  className="opacity-80 hover:opacity-100 transition-opacity"
                />
                <Image
                  src="https://images.ctfassets.net/18izrhn535ym/70RtIi35Iap0xdF7aD3anD/f1ae2eb72bd0e77a4dc39f68eaba8fc4/XB1_Horz_KO_White.svg"
                  alt="Xbox One"
                  width={80}
                  height={40}
                  className="opacity-80 hover:opacity-100 transition-opacity"
                />
                <Image
                  src="https://images.ctfassets.net/18izrhn535ym/6Q5fZNRAzSeWXz7oJmGsRQ/6f6d26baa08194424a5422de9d18edeb/pc.svg"
                  alt="PC"
                  width={20}
                  height={30}
                  className="opacity-70 mb-0.5 hover:opacity-100 transition-opacity"
                />
              </div>
            </motion.div>
          )}
          {showButton && !isHero && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isActive ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-6 md:mt-8"
            >
              <Button
                variant="outline"
                size="lg"
                className="text-[#fff] bg-transparent border-2 border-[#fff] hover:bg-[#F7931A] hover:text-black transition-colors rounded-full px-8 font-[100] [font-family:'Helvetica_Now_Thin',_sans-serif]"
              >
                {buttonText}
              </Button>
            </motion.div>
          )}
        </div>

        {image && (
          <motion.div
            className="flex-1 mb-8 md:mb-0 order-1 md:order-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isActive ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="relative w-full aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]">
              <Image
                src={image || "/placeholder.svg"}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
