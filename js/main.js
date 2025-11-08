// JS avançado para interatividade do site SKYFIT (menu, header scroll, fade-in, partículas, formulário)
document.addEventListener('DOMContentLoaded', function(){
  // --- Optional backend / Supabase configuration ---
  // To enable saving contacts to Supabase, set these two constants to your project values.
  // Example:
  // const SUPABASE_URL = 'https://xyzabc.supabase.co';
  // const SUPABASE_ANON_KEY = 'eyJhbGciOiJI...';
  const SUPABASE_URL = '';
  const SUPABASE_ANON_KEY = '';
  // If you prefer to use your own backend (Node/Express + MySQL), set API_ENDPOINT to
  // e.g. 'http://localhost:3000/api/contact' and the frontend will post there first.
  const API_ENDPOINT = '';

  // Helper: post contact to a self-hosted backend endpoint
  async function postToBackendEndpoint({ name, email, message }){
    if(!API_ENDPOINT) return { ok: false, error: 'API_ENDPOINT not configured' };
    try{
      const res = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });
      const data = await res.json();
      if(!res.ok) return { ok: false, error: data };
      return { ok: true, data };
    }catch(err){
      return { ok: false, error: err.message || err };
    }
  }

  // Helper: insert contact into Supabase via the REST endpoint (no client lib required)
  async function supabaseInsertContact({ name, email, message }){
    if(!SUPABASE_URL || !SUPABASE_ANON_KEY) return { ok: false, error: 'Supabase not configured' };
    try{
      const res = await fetch(`${SUPABASE_URL.replace(/\/+$/,'')}/rest/v1/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Prefer': 'return=representation'
        },
        body: JSON.stringify([{ name, email, message }])
      });
      const data = await res.json();
      if(!res.ok){
        return { ok: false, error: data };
      }
      return { ok: true, data };
    }catch(err){
      return { ok: false, error: err.message || err };
    }
  }
  // ano no rodapé
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // toggle do menu mobile
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if(toggle && nav){
    toggle.addEventListener('click', ()=>{
      nav.classList.toggle('open');
    });
  }

  // header: alterar visual ao rolar
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    if(window.scrollY > 20) header.classList.add('scrolled'); else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  // IntersectionObserver para fade-in on scroll
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  },{threshold:0.12});
  document.querySelectorAll('[data-observe]').forEach(el=>{
    el.classList.add('fade-hidden');
    observer.observe(el);
  });

  // Efeitos visuais no hero (raios, anilhas e halteres)
  const particlesRoot = document.querySelector('.hero-particles');
  if(particlesRoot){
    const rootStyle = getComputedStyle(document.documentElement);
    const neonA = (rootStyle.getPropertyValue('--neon-a') || '#ff2828').trim();
    const neonB = (rootStyle.getPropertyValue('--neon-b') || '#ff5151').trim();

    // Raios energéticos
    for(let i=0; i<12; i++){
      const bolt = document.createElement('div');
      bolt.className = 'bolt-el';
      const left = Math.random()*100;
      const height = 40 + Math.random()*100;
      const rotate = -35 + Math.random()*70;
      
      bolt.style.cssText = `
        left: ${left}%;
        top: ${10 + Math.random()*60}%;
        height: ${height}px;
        transform: translateX(-50%) rotate(${rotate}deg);
        background: linear-gradient(180deg, ${neonA}, ${neonB});
        opacity: ${0.1 + Math.random()*0.4};
        filter: blur(0.8px);
      `;
      
      particlesRoot.appendChild(bolt);
      
      // Animação pulsante
      setInterval(() => {
        bolt.style.opacity = (0.05 + Math.random()*0.5).toString();
        bolt.style.height = (height - 10 + Math.random()*20) + 'px';
      }, 1000 + Math.random()*1500);
    }

    // Anilhas flutuantes
    for(let i=0; i<8; i++){
      const weight = document.createElement('div');
      weight.className = 'weight-plate';
      const size = 30 + Math.random()*40;
      
      weight.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        border: ${2 + size/20}px solid ${neonA};
        left: ${Math.random()*100}%;
        top: ${Math.random()*100}%;
        opacity: 0.1;
        transform: scale(0.8);
        filter: blur(1px);
        transition: all 0.5s ease;
      `;
      
      particlesRoot.appendChild(weight);
      
      // Animação suave
      setInterval(() => {
        weight.style.transform = `scale(${0.7 + Math.random()*0.3})`;
        weight.style.opacity = (0.05 + Math.random()*0.15).toString();
      }, 2000 + Math.random()*2000);
    }

    // Halteres decorativos
    for(let i=0; i<5; i++){
      const dumbbell = document.createElement('div');
      dumbbell.className = 'dumbbell';
      
      dumbbell.style.cssText = `
        position: absolute;
        width: 60px;
        height: 12px;
        left: ${Math.random()*100}%;
        top: ${Math.random()*100}%;
        background: linear-gradient(90deg, ${neonA}, ${neonB});
        opacity: 0.1;
        transform: rotate(${Math.random()*180}deg);
        filter: blur(1px);
        border-radius: 6px;
        &::before, &::after {
          content: '';
          position: absolute;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: ${neonA};
          top: 50%;
          transform: translateY(-50%);
        }
        &::before { left: -10px; }
        &::after { right: -10px; }
      `;
      
      particlesRoot.appendChild(dumbbell);
      
      // Rotação suave
      let rotation = Math.random()*180;
      setInterval(() => {
        rotation += 0.5;
        dumbbell.style.transform = `rotate(${rotation}deg)`;
      }, 50);
    }
  }

  // formulário: validação simples, feedback visual e animação de sucesso
  const form = document.getElementById('contactForm');
  const status = document.querySelector('.form-status');
  const submitBtn = form?.querySelector('button[type="submit"]');
  if(form){
    // adicionar listeners aos inputs para feedback instantâneo
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(inp=>{
      inp.addEventListener('input', (e)=>{
        if(e.target.value && e.target.value.trim().length>0) e.target.classList.add('has-value'); else e.target.classList.remove('has-value');
      });
    });

    // elemento checkmark para animação
    const check = form.querySelector('.checkmark');

    form.addEventListener('submit', function(e){
      e.preventDefault();
      const formData = new FormData(form);
      const name = formData.get('name')?.toString().trim();
      const email = formData.get('email')?.toString().trim();
      const msg = formData.get('message')?.toString().trim();
      if(!name || !email || !msg){
        if(status) status.textContent = 'Por favor, preencha todos os campos.';
        return;
      }
      // feedback de envio
      if(submitBtn){
        submitBtn.disabled = true;
        submitBtn.classList.add('btn-sending');
        const original = submitBtn.textContent;
        submitBtn.textContent = 'Enviando...';
        (async ()=>{
          // If Supabase is configured, try to insert to the DB. Otherwise fall back to local success animation.
          // Try backend endpoint first (if configured), then Supabase (if configured)
          let backendResult = { ok: false };
          if(API_ENDPOINT){
            backendResult = await postToBackendEndpoint({ name, email, message: msg });
            if(!backendResult.ok){
              submitBtn.disabled = false;
              submitBtn.classList.remove('btn-sending');
              submitBtn.textContent = original;
              if(status) status.textContent = 'Erro ao enviar (backend): ' + (backendResult.error?.message || JSON.stringify(backendResult.error));
              return;
            }
          }

          let supaResult = { ok: false };
          if(!API_ENDPOINT && SUPABASE_URL && SUPABASE_ANON_KEY){
            supaResult = await supabaseInsertContact({ name, email, message: msg });
            if(!supaResult.ok){
              submitBtn.disabled = false;
              submitBtn.classList.remove('btn-sending');
              submitBtn.textContent = original;
              if(status) status.textContent = 'Erro ao enviar (Supabase): ' + (supaResult.error?.message || JSON.stringify(supaResult.error));
              return;
            }
          }

          // sucesso (either Supabase accepted or we didn't configure it)
          submitBtn.classList.remove('btn-sending');
          submitBtn.classList.add('btn-success');
          submitBtn.textContent = 'Enviado ✓';
          form.reset();
          if(status) status.textContent = 'Mensagem enviada! Entraremos em contato em breve.';
          // mostrar checkmark com animação
          if(check){
            check.hidden = false;
            check.classList.remove('hide');
            check.classList.add('show');
            setTimeout(()=>{
              check.classList.remove('show');
              check.classList.add('hide');
              setTimeout(()=> check.hidden = true, 500);
            }, 1400);
          }
          setTimeout(()=>{
            submitBtn.disabled = false;
            submitBtn.classList.remove('btn-success');
            submitBtn.textContent = original;
            if(status) status.textContent = '';
          }, 2400);
        })();
      }
    });
  }
});
