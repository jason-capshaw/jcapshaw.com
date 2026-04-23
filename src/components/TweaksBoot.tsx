const BOOT_SCRIPT = `
(function(){
  try {
    var doc = document.documentElement;
    var pairs = [
      ['jc-theme','data-theme','auto'],
      ['jc-density','data-density','normal'],
      ['jc-accent','data-accent','brass'],
      ['jc-typo','data-typo','spectral'],
      ['jc-home','data-home','sparse']
    ];
    for (var i = 0; i < pairs.length; i++) {
      var v = localStorage.getItem(pairs[i][0]);
      if (v && v !== pairs[i][2]) doc.setAttribute(pairs[i][1], v);
    }
  } catch (e) {}
})();
`;

export default function TweaksBoot() {
  return (
    <script
      dangerouslySetInnerHTML={{ __html: BOOT_SCRIPT }}
    />
  );
}
