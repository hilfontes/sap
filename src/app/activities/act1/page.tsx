"use client";

export default function ActivitiesPage() {
  const activities = [
    {
      id: 1,
      image: "/act11.jpg",
      title: "Dr. Manuel Leite Carneiro",
      description:
        "pela Universidade Computense em Madrid, Hospital Nino Jesus - Angola",
    },
    {
      id: 2,
      image: "/act7.jpg",
      title: "Carmen do Carmo",
      description:
        "Medica Psiquiatra, especialização em Psiquiatria da Infância - Moçambique",
    },
    {
      id: 3,
      image: "/act8.jpg",
      title: "Raquel Santos",
      description: "Pediatra",
    },
    {
      id: 4,
      image: "/act9.jpg",
      title: "Telma Francisco",
      description: "Pediatra...",
    },
    {
      id: 5,
      image: "/act10.jpg",
      title: "Sandra Lobo",
      description: "Pediatra...",
    },
    {
      id: 6,
      image: "/act6.jpg",
      title: "Patricia Costa Reis",
      description: "Pediatra...",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white px-10 py-16">
      <h1 className="text-4xl font-bold mb-10">
        Webinar - Pediatria Internacional
      </h1>

      <h2 className="text-4xl font-bold mb-10">Palestrantes</h2>

      {/* Grid das 6 imagens */}
      <div className="grid grid-cols-6 gap-6">
        {activities.map((act) => (
          <div key={act.id} className="group cursor-pointer">
            {/* Image */}
            <div className="overflow-hidden rounded-xl">
              <img
                src={act.image}
                className="w-full h-[260px] object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>

            {/* Details */}
            <div className="mt-3">
              <h3 className="text-lg font-semibold">{act.title}</h3>
              <p className="text-sm text-gray-400">{act.description}</p>
            </div>
          </div>
        ))}

        {/* Imagem grande abaixo */}
        <div className="col-span-6 mt-8">
          <img
            src="/act2.jpeg"
            //className="w-full h-[420px] object-cover rounded-xl"
            className="w-full h-[350px] md:h-[500px] lg:h-[650px] object-cover rounded-xl"
          />
        </div>
      </div>
    </div>
  );
}
