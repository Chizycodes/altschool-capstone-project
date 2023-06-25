import React from 'react';
import NavBar from '../../components/landing/NavBar';
import Hero from '../../components/landing/Hero';
import AboutSection from '../../components/landing/AboutSection';
import Testimonials from '../../components/landing/Testimonials';
import Footer from '../../components/landing/Footer';

const Home = () => {
	return (
		<div className="overflow-hidden">
			<section className="max-w-7xl mx-auto">
				<NavBar />
			</section>
			<section>
				<Hero />
			</section>
			<section>
				<AboutSection />
			</section>
			<section className="mb-20">
				<Testimonials />
			</section>
			<section>
				<Footer />
			</section>
		</div>
	);
};

export default Home;
