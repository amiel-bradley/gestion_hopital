<template>
  <div class="home-container">
    <section class="hero">
      <div class="hero-content">
        <span class="badge">Nouveau : Version 2026 disponible</span>
        <h1>Gérez vos équipes en un clin d'œil</h1>
        <p>
          La plateforme complète pour centraliser vos données employés, 
          suivre les performances et simplifier vos processus RH.
        </p>
        
        <div class="cta-group">
          <RouterLink to="/login" class="btn-primary">Commencer maintenant</RouterLink>
          <RouterLink to="/about" class="btn-secondary">En savoir plus</RouterLink>
        </div>
      </div>
      
      <div class="hero-visual">
        <div class="abstract-shape">
          <div class="mini-card card-1">👥 1,2k Employés</div>
          <div class="mini-card card-2">✅ Tâches finies</div>
          <div class="mini-card card-3">📈 +12% Croissance</div>
        </div>
      </div>
    </section>

    <section class="features-preview">
      <div class="feat">
        <h3>Sécurisé</h3>
        <p>Données cryptées et accès contrôlés.</p>
      </div>
      <div class="feat">
        <h3>Rapide</h3>
        <p>Interface optimisée pour la productivité.</p>
      </div>
      <div class="feat">
        <h3>Cloud</h3>
        <p>Accédez à vos dossiers partout, tout le temps.</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
}

/* Hero Section */
.hero {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  align-items: center;
  gap: 4rem;
  margin-bottom: 6rem;
}

.badge {
  background-color: #e0f2fe;
  color: #0369a1;
  padding: 6px 16px;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 700;
  display: inline-block;
  margin-bottom: 1.5rem;
}

h1 {
  font-size: 3.5rem;
  color: #0f172a;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  font-weight: 800;
}

p {
  font-size: 1.2rem;
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 2.5rem;
}

.cta-group {
  display: flex;
  gap: 1rem;
}

.btn-primary {
  background-color: #0ea5e9;
  color: white;
  padding: 1rem 2rem;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 700;
  transition: all 0.3s ease;
  box-shadow: 0 10px 15px -3px rgba(14, 165, 233, 0.3);
}

.btn-primary:hover {
  background-color: #0284c7;
  transform: translateY(-3px);
}

.btn-secondary {
  background-color: transparent;
  color: #0f172a;
  padding: 1rem 2rem;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 700;
  border: 2px solid #e2e8f0;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background-color: #f8fafc;
  border-color: #cbd5e1;
}

/* Visuel Abstrait à droite */
.hero-visual {
  position: relative;
  height: 300px;
  background: linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%);
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
}

.mini-card {
  position: absolute;
  background: white;
  padding: 15px 20px;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  font-weight: 700;
  font-size: 0.9rem;
  color: #0c4a6e;
}

.card-1 { top: 10%; left: -10%; }
.card-2 { bottom: 20%; right: -5%; }
.card-3 { top: 50%; left: 20%; }

.features-preview {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  border-top: 1px solid #e2e8f0;
  padding-top: 4rem;
}

.feat h3 {
  color: #0ea5e9;
  margin-bottom: 0.5rem;
}

.feat p {
  font-size: 0.95rem;
  margin: 0;
}

/* Responsive */
@media (max-width: 968px) {
  .hero { grid-template-columns: 1fr; text-align: center; }
  .cta-group { justify-content: center; }
  .hero-visual { display: none; }
  .features-preview { grid-template-columns: 1fr; }
}
</style>