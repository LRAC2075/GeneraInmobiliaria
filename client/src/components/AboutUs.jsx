// src/components/AboutUs.jsx

import React from 'react';
import SectionHeader from './SectionHeader';
import { AnimatedSection, AnimatedCounter, useIntersectionObserver } from '../utils/animationUtils'; // Asegúrate de que estos hooks estén en un archivo separado o importarlos directamente.
import CountUp from 'react-countup';

// Componente para la sección de "Quiénes Somos"
const AboutUs = () => {
    return (
        <AnimatedSection className="py-16 sm:py-24 bg-light-subtle dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="text-center flex flex-col justify-center h-full">
                        <SectionHeader
                            title="Quiénes Somos"
                            subtitle="GENERA es el resultado de la visión y pasión por la excelencia. Fundada en 2005, nuestra misión siempre ha sido la de transformar ideas en realidades tangibles, superando las expectativas en cada proyecto."
                            className="max-w-3xl mx-auto mb-8"
                        />
                        <p className="text-gray-600 dark:text-gray-400 mt-6 text-xl font-serif italic max-w-2xl mx-auto leading-relaxed mb-8">
                            "Creemos en la fusión de la artesanía tradicional con la innovación tecnológica. Este enfoque nos permite entregar resultados que no solo son estéticamente impecables, sino también funcionales y sostenibles a largo plazo."
                        </p>
                    </div>
                    <div className="h-80 md:h-full">
                        
                        <img
                            src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1974&auto=format&fit=crop"
                            alt="Equipo de GENERA trabajando"
                            className="rounded-lg shadow-2xl w-full h-full object-cover"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 text-center">
                    <AnimatedCounter end={new Date().getFullYear() - 2005} title="Años de Trayectoria" />
                    <AnimatedCounter end={150} suffix="+" title="Proyectos Completados" />
                    <AnimatedCounter end={100} suffix="+" title="Clientes Satisfechos" />
                </div>
            </div>
        </AnimatedSection>
    );
};

export default AboutUs;