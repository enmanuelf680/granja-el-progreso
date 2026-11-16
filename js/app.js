const services = [
  ['Producción de leche','ordeno','Ordeño y manejo de la leche para su distribución.','Disponibilidad de leche fresca para clientes y comercios.'],
  ['Venta de ganado','corrales','Oferta de bovinos según la disponibilidad de la finca.','Opciones para ampliar o renovar un hato.'],
  ['Producción de carne','carne','Manejo de ganado bovino destinado a la producción de carne.','Cortes para hogares y comercios.'],
  ['Asesoría agropecuaria','equipo','Orientación sobre alimentación, manejo de pasturas y cuidado del ganado.','Ideas prácticas para organizar el trabajo de la finca.'],
  ['Crianza y reproducción bovina','equipo','Acompañamiento en la crianza y selección de animales para reproducción.','Planificación del crecimiento del hato.']
];
const products = [
  ['Leche fresca','leche','Leche bovina para consumo después del tratamiento adecuado.','RD$85 por litro'],
  ['Queso artesanal','queso','Queso fresco elaborado a partir de leche bovina.','RD$260 por libra'],
  ['Yogur','yogur','Yogur natural de textura cremosa.','RD$120 por 500 g'],
  ['Ganado para reproducción','corrales','Bovinos seleccionados para integrar un hato reproductor.','Desde RD$65,000 por animal'],
  ['Carne premium','carne','Selección de cortes de res para cocinar a la plancha o a la parrilla.','RD$420 por libra']
];
const photos = [
  ['Ganado bovino','ganado'],['Corrales','corrales'],['Pastizales','pastizales'],
  ['Ordeño','ordeno'],['Personal trabajando','equipo'],['Instalaciones','instalaciones']
];
function make(tag, text, className) {
  const node = document.createElement(tag);
  if (text) node.textContent = text;
  if (className) node.className = className;
  return node;
}
function photo(file, label) {
  const img = make('img');
  img.src = 'assets/' + file + '.webp';
  img.alt = label;
  img.loading = 'lazy';
  img.decoding = 'async';
  return img;
}
function renderCards(list, id, isProduct) {
  const grid = document.getElementById(id);
  for (const [name, file, description, detail] of list) {
    const card = make('article', null, 'card');
    const copy = make('div');
    copy.append(make('h3', name), make('p', description),
      make('p', isProduct ? detail : 'Beneficio. ' + detail, isProduct ? 'price' : null));
    card.append(photo(file, name), copy);
    grid.append(card);
  }
}
renderCards(services, 'lista-servicios', false);
renderCards(products, 'lista-productos', true);

const dialog = document.getElementById('foto');
for (const [name, file] of photos) {
  const tile = make('button');
  tile.type = 'button';
  const img = photo(file, '');
  tile.append(img, make('span', name));
  tile.addEventListener('click', () => {
    const enlarged = document.getElementById('foto-ampliada');
    enlarged.src = img.src;
    enlarged.alt = name;
    document.getElementById('foto-titulo').textContent = name;
    dialog.showModal();
  });
  document.getElementById('lista-galeria').append(tile);
}
const toggle = document.querySelector('.toggle');
const nav = document.getElementById('nav');
function setMenu(open) {
  nav.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', String(open));
}
toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') === 'false'));
nav.addEventListener('click', event => {
  if (event.target.closest('a')) setMenu(false);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav.classList.contains('open')) {
    setMenu(false);
    toggle.focus();
  }
});
const form = document.getElementById('form-contacto');
form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  document.getElementById('form-estado').textContent = 'Simulación completada. Tu mensaje no se envió.';
  form.reset();
});
