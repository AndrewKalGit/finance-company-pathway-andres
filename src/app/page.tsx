import Banner from '../app/landing/banner';
import Booking from '../app/landing/booking';
import Footer from '../app/landing/footer';
import Header from '../app/landing/header';
import Eligibility from '../app/landing/initial-eligibility';
import Process from '../app/landing/process';
import Results from '../app/landing/results';
import Reviews from '../app/landing/reviews';
import Services from '../app/landing/services';

export default Home;
function Home() {
	return (
		<main>
			<Header />
			<Banner />
			<Services />
			<Eligibility />
			<Process />
			<Results />
			<Reviews />
			<Booking />
			<Footer />
		</main>
	);
}
