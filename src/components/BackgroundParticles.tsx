'use client';

import { useState, useEffect, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Container, ISourceOptions } from "@tsparticles/engine";

export function BackgroundParticles() {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
          await loadSlim(engine);
        }).then(() => {
          setInit(true);
        });
      }, []);

      const particlesConfig: ISourceOptions = useMemo(
        () => ({
          particles: {
              number: {
                value: 100,
              },
              size: {
                value: 1,
              },
              links: {
                enable: true,
                distance: 115,
                opacity: 0.25,
              },
              move: {
                enable: true,
                speed: 1.5,
              },
          }
        }), [],
      );

      const particlesLoaded = async (container?: Container): Promise<void> => {
        console.log(container);
      };

    if (init) {
        return (
            <Particles id="tsparticles" particlesLoaded={particlesLoaded} options={particlesConfig} />
        );
    }

    return <></>;
};