import { $, component$, useRef, useStore, useWatch$ } from '@builder.io/qwik';
import { HeroSlide } from '~/routes';

export default component$<{ slides: HeroSlide[] }>(({ slides }) => {
	const carouselRef = useRef();
	const state = useStore({ currentIndex: 0 });

	const movePrev = $(() => {
		if (state.currentIndex > 0) {
			state.currentIndex -= 1;
		}
	});

	const moveNext = $(() => {
		if (state.currentIndex < slides.length - 1) {
			state.currentIndex += 1;
		}
	});

	const isDisabled = (direction: 'next' | 'prev') =>
		direction === 'prev'
			? state.currentIndex <= 0
			: direction === 'next'
			? state.currentIndex === slides.length - 1
			: false;

	useWatch$(({ track }) => {
		track(state, 'currentIndex');
		if (!!carouselRef?.current) {
			carouselRef.current.scrollLeft = window.innerWidth * state.currentIndex;
		}
	});

	return (
		<div className='carousel my-4 mx-auto'>
			<div className='relative overflow-hidden'>
				{slides.length > 1 && (
					<div className='flex justify-between absolute top left w-full h-full'>
						<button
							onClick$={movePrev}
							className='text-black w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300'
							disabled={isDisabled('prev')}
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-12 w-20 -ml-5'
								fill='none'
								stroke='currentColor'
								stroke-width={2}
							>
								<path
									stroke-linecap='round'
									stroke-linejoin='round'
									d='M15 19l-7-7 7-7'
								/>
							</svg>
							<span className='sr-only'>Prev</span>
						</button>
						<button
							onClick$={moveNext}
							className='text-black w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300'
							disabled={isDisabled('next')}
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-12 w-20 -ml-5'
								fill='none'
								stroke='currentColor'
								stroke-width={2}
							>
								<path
									stroke-linecap='round'
									stroke-linejoin='round'
									d='M9 5l7 7-7 7'
								/>
							</svg>
							<span className='sr-only'>Next</span>
						</button>
					</div>
				)}
				<div
					ref={carouselRef}
					className='carousel-container relative flex gap-1 overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0'
				>
					{slides.map((slide, index) => {
						return (
							<div
								key={index}
								className='carousel-item text-center relative w-full h-72 snap-start min-w-full flex'
							>
								<div class='w-1/2 pl-12 pr-6 flex flex-col justify-center'>
									<h1 class='text-3xl font-bold tracking-wide text-gray-800 lg:text-4xl'>
										{slide.title}
									</h1>

									<div class='mt-8 space-y-5 '>
										<h3 class='text-2xl font-bold tracking-wide text-special-blue lg:text-3xl'>
											{slide.subTitle}
										</h3>
									</div>
									<div class='flex mt-6 space-y-3 lg:space-y-0 lg:flex-row justify-around'>
										<a class='block px-6 py-2.5 text-sm font-medium tracking-wider text-center text-white transition-colors duration-300 transform bg-gray-800 rounded-md lg:mx-4 hover:bg-gray-600'>
											Explore the docs
										</a>
									</div>
								</div>
								<div class='w-1/2 flex items-center justify-center w-full h-full pl-6 pr-12'>
									<img
										class='object-cover w-full h-full mx-auto rounded-md'
										src={slide.imageUrl}
										alt='...'
									/>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
});
