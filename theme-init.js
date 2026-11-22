try{document.documentElement.dataset.theme=localStorage.getItem('nasher.theme')||'light'}catch{}

try{const value=Number(localStorage.getItem('nasher.textScale'));document.documentElement.style.fontSize=([75,87.5,100,112.5,125,137.5,150].includes(value)?value:100)+'%'}catch{}
