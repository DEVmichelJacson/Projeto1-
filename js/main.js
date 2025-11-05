// JS simples para interatividade do site SKYFIT
document.addEventListener('DOMContentLoaded', function(){
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

  // formulário: validação simples e mensagem
  const form = document.getElementById('contactForm');
  const status = document.querySelector('.form-status');
  if(form){
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
      // Simular envio
      if(status) status.textContent = 'Enviando...';
      setTimeout(()=>{
        form.reset();
        if(status) status.textContent = 'Mensagem enviada! Entraremos em contato em breve.';
      }, 900);
    });
  }
});
