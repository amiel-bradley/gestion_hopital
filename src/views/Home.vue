<template>
  <div class="home-container">
    <section class="hero">
      <div class="hero-content">
        <span class="badge">Système de Gestion Hospitalière v2.0</span>
        <h1>L'excellence au service de vos équipes soignantes</h1>
        <p>
          Optimisez la gestion de votre personnel médical, suivez les admissions 
          et coordonnez les soins en temps réel avec une interface pensée pour les praticiens.
        </p>
        
        <div class="cta-group">
          <RouterLink to="/login" class="btn-primary">Accès Portail Santé</RouterLink>
          <RouterLink to="/about" class="btn-secondary">Découvrir les modules</RouterLink>
        </div>
      </div>
      
      <div class="hero-visual">
        <div class="abstract-shape">
          <div class="mini-card card-1">👨‍⚕️ 12 Médecins</div>
          <div class="mini-card card-2">🚑 24h/24 Service</div>
          <div class="mini-card card-3">🏥 98% Lits occupés</div>
        </div>
      </div>
    </section>

    <section class="features-preview">
      <div class="feat">
        <h3>Dossier Médical</h3>
        <p>Centralisation sécurisée des données patients et des historiques de soins.</p>
      </div>
      <div class="feat">
        <h3>Planning Soignants</h3>
        <p>Gestion intelligente des rotations et des gardes du corps médical.</p>
      </div>
      <div class="feat">
        <h3>Gestion de lits</h3>
        <p>Visualisation en temps réel de la disponibilité des chambres et services.</p>
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

.hero {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  align-items: center;
  gap: 4rem;
  margin-bottom: 6rem;
}

.badge {
  background-color: #ccfbf1; 
  color: #0d9488; 
  padding: 6px 16px;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 700;
  display: inline-block;
  margin-bottom: 1.5rem;
  border: 1px solid #99f6e4;
}

h1 {
  font-size: 3.5rem;
  color: #1e293b;
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
  background-color: #0d9488; 
  color: white;
  padding: 1rem 2rem;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 700;
  transition: all 0.3s ease;
  box-shadow: 0 10px 15px -3px rgba(13, 148, 136, 0.3);
}

.btn-primary:hover {
  background-color: #0f766e;
  transform: translateY(-3px);
}

.btn-secondary {
  background-color: transparent;
  color: #1e293b;
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

.hero-visual {
  position: relative;
  height: 300px;
  background: linear-gradient(135deg, #ccfbf1 0%, #99f6e4 100%);
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
}

.mini-card {
  position: absolute;
  background: white;
  padding: 15px 20px;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.08);
  font-weight: 700;
  font-size: 0.9rem;
  color: #0f766e;
  animation: float 4s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.card-1 { top: 10%; left: -10%; animation-delay: 0s; }
.card-2 { bottom: 20%; right: -5%; animation-delay: 1s; }
.card-3 { top: 50%; left: 20%; animation-delay: 2s; }

.features-preview {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  border-top: 1px solid #e2e8f0;
  padding-top: 4rem;
}

.feat h3 {
  color: #0d9488;
  margin-bottom: 0.5rem;
}

.feat p {
  font-size: 0.95rem;
  color: #64748b;
}

@media (max-width: 968px) {
  .hero { grid-template-columns: 1fr; text-align: center; }
  .cta-group { justify-content: center; }
  .hero-visual { display: none; }
  .features-preview { grid-template-columns: 1fr; }
}
</style>