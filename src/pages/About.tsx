
import BaseLayout from "../layout/BaseLayout";



export default  function(){
return (
    <BaseLayout>
    <>
  {/* About Us Section */}
  <section className="py-5" id="about">
    <div className="container py-5">
      <div className="row align-items-center">
        <div className="col-lg-6">
          <img
            src="images/photo2-747x580.png"
            alt="Notre équipe"
            className="img-fluid rounded-4 shadow-lg"
          />
        </div>
        <div className="col-lg-6">
          <h2 className="section-title">À propos de 2comsystems</h2>
          <p className="lead">
            Experts en solutions de tracking automobile, Gestion du carburant et
            Gestion flotte automobile depuis 2016
          </p>
          <p>
            <b>2COMS</b>, créée depuis 2016, est une start-up ivorienne,
            spécialisée dans les Business Solutions Géo-Mobiles. Editeur
            d’applications, opérateur de services en ligne et intégrateur de
            solution de géolocalisation, 2COMS, met à votre disposition une
            gamme complète de solutions de navigation connectée, pour optimiser
            la gestion de vos ressources mobiles et des comportements de
            conduite.{" "}
          </p>
          <div className="row mt-4">
            <div className="col-md-6 mb-3">
              <div className="d-flex">
                <img
                  src="images/traking_auto.jpg"
                  style={{ height: 40, width: 40, borderRadius: 10 }}
                />
                <div>
                  <h5 className="mb-1"> Tracking automobile</h5>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="d-flex">
                <img
                  src="images/gc.jpg"
                  style={{ height: 40, width: 40, borderRadius: 10 }}
                />
                <div>
                  <h5 className="mb-1">Gestion du carburant</h5>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="d-flex">
                <img
                  src="images/fotte.jpg"
                  style={{ height: 40, width: 40, borderRadius: 10 }}
                />
                <div>
                  <h5 className="mb-1">Gestion flotte automobile</h5>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="d-flex">
                <i className="fas fa-check-circle fa-2x text-primary me-2 mt-1" />
                <div>
                  <h5 className="mb-1">Support: Assistance 24/7</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
 {/* Team Section */}
<section className="py-5" id="team">
  <div className="container py-5">
    <h2 className="text-center mb-5 section-title">Notre équipe</h2>

    <div className="row g-4">

      {/* Membre 1 */}
      <div className="col-lg-3 col-md-4 col-sm-6">
        <div className="team-card shadow-lg rounded-4 overflow-hidden">
          <div className="team-img">
            <img
              src="/images/team1.jpg"
              alt="Membre 1"
              className="img-fluid"
            />
          </div>
          <div className="p-3 text-center">
            <h5 className="mb-1">Nom membre 1</h5>
            <p className="text-muted">Fonction / Rôle</p>
          </div>
        </div>
      </div>

      {/* Membre 2 */}
      <div className="col-lg-3 col-md-4 col-sm-6">
        <div className="team-card shadow-lg rounded-4 overflow-hidden">
          <div className="team-img">
            <img
              src="/images/team2.jpg"
              alt="Membre 2"
              className="img-fluid"
            />
          </div>
          <div className="p-3 text-center">
            <h5 className="mb-1">Nom membre 2</h5>
            <p className="text-muted">Fonction / Rôle</p>
          </div>
        </div>
      </div>

      {/* Membre 3 */}
      <div className="col-lg-3 col-md-4 col-sm-6">
        <div className="team-card shadow-lg rounded-4 overflow-hidden">
          <div className="team-img">
            <img
              src="/images/team3.jpg"
              alt="Membre 3"
              className="img-fluid"
            />
          </div>
          <div className="p-3 text-center">
            <h5 className="mb-1">Nom membre 3</h5>
            <p className="text-muted">Fonction / Rôle</p>
          </div>
        </div>
      </div>

      {/* Membre 4 */}
      <div className="col-lg-3 col-md-4 col-sm-6">
        <div className="team-card shadow-lg rounded-4 overflow-hidden">
          <div className="team-img">
            <img
              src="/images/team4.jpg"
              alt="Membre 4"
              className="img-fluid"
            />
          </div>
          <div className="p-3 text-center">
            <h5 className="mb-1">Nom membre 4</h5>
            <p className="text-muted">Fonction / Rôle</p>
          </div>
        </div>
      </div>

     
    </div>
  </div>
</section>
{/* Section Témoignages */}
<section
  className="testimonial-section py-5"
  id="testimonials"
  style={{ 
    backgroundColor: "#ffffff",
    background: "#ffffff"
  }}
>
  <div className="container position-relative" style={{ zIndex: 1 }}>
    {/* Titre */}
    <div className="row justify-content-center mb-5">
      <div className="col-lg-8 text-center">
        <h2 
          className="section-title display-5 fw-bold mb-3"
          style={{ color: "#000000" }}
        >
          Témoignages de nos clients
        </h2>
        <p 
          className="lead"
          style={{ color: "#6c757d" }}
        >
          Découvrez ce que nos clients disent de nos solutions et services.
        </p>
      </div>
    </div>

    {/* Desktop Carousel */}
    <div className="desktop-testimonials d-none d-md-block">
      <div
        id="testimonialCarousel"
        className="carousel slide testimonial-carousel"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {/* Slide 1 */}
          <div className="carousel-item active">
            <div className="row g-4 justify-content-center">
              <div className="col-md-6">
                <div 
                  className="testimonial-card p-4 shadow rounded-4 h-100"
                  style={{ backgroundColor: "#ffffff" }}
                >
                  <div className="testimonial-content">
                    <p className="mb-4 fst-italic" style={{ color: "#000000" }}>
                      "Excellent service, le suivi de notre flotte automobile est devenu très facile."
                    </p>
                    <div className="testimonial-author">
                      <h5 className="mb-1 fw-bold" style={{ color: "#000000" }}>Jean K.</h5>
                      <small style={{ color: "#6c757d" }}>Directeur Logistique</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div 
                  className="testimonial-card p-4 shadow rounded-4 h-100"
                  style={{ backgroundColor: "#ffffff" }}
                >
                  <div className="testimonial-content">
                    <p className="mb-4 fst-italic" style={{ color: "#000000" }}>
                      "La solution de gestion du carburant nous a permis de réduire nos coûts considérablement."
                    </p>
                    <div className="testimonial-author">
                      <h5 className="mb-1 fw-bold" style={{ color: "#000000" }}>Marie L.</h5>
                      <small style={{ color: "#6c757d" }}>Responsable Flotte</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="carousel-item">
            <div className="row g-4 justify-content-center">
              <div className="col-md-6">
                <div 
                  className="testimonial-card p-4 shadow rounded-4 h-100"
                  style={{ backgroundColor: "#ffffff" }}
                >
                  <div className="testimonial-content">
                    <p className="mb-4 fst-italic" style={{ color: "#000000" }}>
                      "Support 24/7 très réactif et professionnel, je recommande vivement 2COMS."
                    </p>
                    <div className="testimonial-author">
                      <h5 className="mb-1 fw-bold" style={{ color: "#000000" }}>Ahmed S.</h5>
                      <small style={{ color: "#6c757d" }}>Entrepreneur</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div 
                  className="testimonial-card p-4 shadow rounded-4 h-100"
                  style={{ backgroundColor: "#ffffff" }}
                >
                  <div className="testimonial-content">
                    <p className="mb-4 fst-italic" style={{ color: "#000000" }}>
                      "Interface intuitive et facile à utiliser pour toute notre équipe."
                    </p>
                    <div className="testimonial-author">
                      <h5 className="mb-1 fw-bold" style={{ color: "#000000" }}>Fatou D.</h5>
                      <small style={{ color: "#6c757d" }}>Responsable Opérations</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contrôles Carousel */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#testimonialCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon bg-dark rounded-circle p-3" aria-hidden="true" />
          <span className="visually-hidden">Précédent</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#testimonialCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon bg-dark rounded-circle p-3" aria-hidden="true" />
          <span className="visually-hidden">Suivant</span>
        </button>

        {/* Indicateurs */}
        <div className="carousel-indicators mt-4 position-relative">
          <button
            type="button"
            data-bs-target="#testimonialCarousel"
            data-bs-slide-to={0}
            className="active bg-dark"
            aria-current="true"
            aria-label="Slide 1"
          />
          <button
            type="button"
            data-bs-target="#testimonialCarousel"
            data-bs-slide-to={1}
            className="bg-dark"
            aria-label="Slide 2"
          />
        </div>
      </div>
    </div>

    {/* Mobile Slider */}
    <div className="mobile-testimonials d-md-none">
      <div
        className="d-flex overflow-auto py-3"
        style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none" }}
      >
        <div className="d-flex" style={{ gap: 20, padding: "0 15px" }}>
          {[
            {
              text: "Excellent service, le suivi de notre flotte automobile est devenu très facile.",
              name: "Jean K.",
              role: "Directeur Logistique",
            },
            {
              text: "La solution de gestion du carburant nous a permis de réduire nos coûts considérablement.",
              name: "Marie L.",
              role: "Responsable Flotte",
            },
            {
              text: "Support 24/7 très réactif et professionnel, je recommande vivement 2COMS.",
              name: "Ahmed S.",
              role: "Entrepreneur",
            },
            {
              text: "Interface intuitive et facile à utiliser pour toute notre équipe.",
              name: "Fatou D.",
              role: "Responsable Opérations",
            },
          ].map((testimonial, idx) => (
            <div 
              key={idx} 
              style={{ 
                scrollSnapAlign: "center", 
                minWidth: "280px",
                flexShrink: 0
              }}
            >
              <div 
                className="testimonial-card p-4 shadow rounded-4 h-100"
                style={{ backgroundColor: "#ffffff" }}
              >
                <div className="testimonial-content">
                  <p className="mb-3 fst-italic" style={{ color: "#000000" }}>{testimonial.text}</p>
                  <h5 className="mb-1 fw-bold" style={{ color: "#000000" }}>{testimonial.name}</h5>
                  <small style={{ color: "#6c757d" }}>{testimonial.role}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>
</>

    </BaseLayout>
  );
}
