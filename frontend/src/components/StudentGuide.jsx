import React from 'react';

const StudentGuide = () => {
    return (
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold mb-6 sm:text-2xl">Student Guide</h1>
            
            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-4 sm:text-xl">Important Rules</h2>
                <ul className="list-disc list-inside space-y-2">
                    <li className="text-base sm:text-sm">Be punctual and attend all classes regularly.</li>
                    <li className="text-base sm:text-sm">Respect your teachers and fellow students at all times.</li>
                    <li className="text-base sm:text-sm">Complete all assignments and submit them on time.</li>
                    <li className="text-base sm:text-sm">Maintain cleanliness in your study area and the school premises.</li>
                    <li className="text-base sm:text-sm">Follow the dress code and adhere to the school's uniform policy.</li>
                </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-4 sm:text-xl">Prayers for Students</h2>
                <p className="mb-4 text-base sm:text-sm">Dear Students, may you always seek knowledge with an open heart and mind. May your efforts be rewarded, and may you excel in your studies and endeavors. Remember, success comes with perseverance and hard work. Keep believing in yourself and stay positive.</p>
                <p className="text-base sm:text-sm">Here is a simple prayer you might find helpful:</p>
                <blockquote className="border-l-4 border-blue-500 pl-4 italic mt-2 text-base sm:text-sm">
                    <p>"O God, Thank you for fulfilling all our needs. May your blessings rest upon us and make us worthy children. Guide us in all our undertakings, make us wiser and better human beings, enlighten our minds and cleanse our hearts, that we may lead a worthy and righteous life."</p>
                </blockquote>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-4 sm:text-xl">Etiquette</h2>
                <ul className="list-disc list-inside space-y-2">
                    <li className="text-base sm:text-sm">Greet your teachers and peers politely.</li>
                    <li className="text-base sm:text-sm">Raise your hand to ask questions or contribute to discussions.</li>
                    <li className="text-base sm:text-sm">Listen attentively and avoid interrupting others.</li>
                    <li className="text-base sm:text-sm">Be considerate and help others when needed.</li>
                    <li className="text-base sm:text-sm">Follow instructions and participate actively in class activities.</li>
                </ul>
            </section>
        </div>
    );
};

export default StudentGuide;
