
const commma = new Intl.NumberFormat('ja-JP');

const idList = {karatetu19s:'カラオケの鉄人コラボ2019夏'}

//カラ鉄'19夏
const karatetu19s ={コースター:600, 缶バッジ:400, アクスタ:700};
const charaCoasterFirst = ['ペコリーヌ', 'コッコロ', 'キャル', 'シズル', 'キョウカ', 'クリスティーナ', 'タマキ', 'ユカリ', 'イオ', 'スズナ', 'ムイミ', 'ペコ(限定)'];
//const charaCoasterSecond
const canBadge = ['ペコリーヌ', 'コッコロ', 'キャル', 'キョウカ', 'ミミ', 'ミソギ', 'スズメ', 'サレン', 'ミフユ', 'ユカリ', 'タマキ', 'アキノ'];
const miniAcrylicStand = ['ペコリーヌ', 'コッコロ', 'キャル', 'シズル', 'キョウカ', 'ミヤコ', 'クリスティーナ', 'タマキ', 'エリコ'];


const back = () =>{
  location.href='index.html';
}

let event='';
if (location.search!=''){
  event = purl().param('gID');
  //console.log(event);
}

$(function(){
  $("#gatya").html(idList[event]);
  switch (event) {
      case 'karatetu19s':
        $("#selectItemArea").html('<br><h3 class=\"discliption\">欲しいアイテムを選択</h3><select name=\"itemName\"><option value=\"NULL\">-選択してください-</option><option value=\"コースター(前半)\">コースター(前半)</option><option value=\"缶バッジ\">缶バッジ</option><option value=\"アクスタ\">アクリルスタンド</option></select>');
        break;
      default:
        console.log("error!:不正なURLです");
    }

  //アイテム切替時に自動実行
  $("select[name='itemName']").change(function(){
    let charaHTML;
    charaHTML = '<br><h3 class=\"discliption\">欲しいキャラを選択</h3><select name=\"charaName\"><option value=\"NULL\">--指定しない--</option>';
    const item = $(this).val();
    const charaPrint = (charaName) => {
      charaHTML += '<option value=\"'+charaName+'\">'+charaName+'</option>';
    }
    if (event=='karatetu19s'){
      switch (item) {
        case 'コースター(前半)':
          charaCoasterFirst.forEach(charaPrint);
          charaHTML += '</select>';
          break;
        case '缶バッジ':
          canBadge.forEach(charaPrint);
          charaHTML += '</select>';
          break;
        case 'アクスタ':
          miniAcrylicStand.forEach(charaPrint);
          charaHTML += '</select>';
          break;
        default:
          alert("アイテムは選択必須です");
          charaHTML='';
      } 
    }
    //console.log(charaHTML);
    $("#selectCharaArea").html(charaHTML);
    });
  
  //オプション切替時に自動実行
  
  $("select[name='gatya_option']").change(function(){
    //好きな数だけが選択されたとき
    if($(this).val()=='charaNUM'){
      $('#selectOptionArea').html('<br><p class=\"discliption\">欲しい数を入力<br>(半角数字1～1000)</p><input type=\"number\" name=\"numOfChara\" min=\"1\" max=\"1000\" value=\"1\">');
    }else{
      $('#selectOptionArea').html('');
    }
  });
});

const simulate= () => {
  let usr, gatyaAry, resultText, n, i;
  
  //const verNumber=($("h1[class='header']").text()).match(/v.*/);
  usr = $("input[name='usrName']").val();
  const gatyaOption = $("select[name='gatya_option']").val();
  let itemName = $("select[name='itemName']").val();
  const charaName = $("select[name='charaName']").val();
  
  //イベントが選択済みか？m->
  if($("#gatya").text()!='選択されていません'){
    //アイテムが選択されているか？
    if(itemName!='NULL'){
      //オプションが選択されているか？
      switch(gatyaOption){
        case 'time1':
        case 'time10':
          break;
        case 'chara':
        case 'charaNUM':
          //キャラが選択されているか？
          if(charaName=='NULL'){
            alert("このオプションを選択するにはキャラを指定してください。")
            $("textarea[name='result_text']").val('');
            return -1; //異常終了
          }
          break;
        default:
          alert("オプションは選択必須です");
          $("textarea[name='result_text']").val('');
          return -1; //異常終了
      }
      //ここからガチャ
      resultText = "【";
      if(usr!=''){
        usr = usr.replace(/[@＠]/g,'@ ');  //@ツイ回避
        usr = usr.replace(/[‪#＃‬]/g,'♯');  //ハッシュタグ含有によるエラー回避
        resultText+=usr+'さんの'
      }
      resultText+='ガチャ結果:';
      //カラ鉄'19夏
      if(event=karatetu19s){
        resultText+='カラ鉄\'19夏】';
        //itemSelect
        if(itemName=='コースター(前半)'){
          gatyaAry = charaCoasterFirst;
          itemName = 'コースター';
        }else if(itemName=='缶バッジ'){
          gatyaAry = canBadge;
        }else if(itemName=='アクスタ'){
          gatyaAry = miniAcrylicStand;
        }
        const len = gatyaAry.length;
        
        //optionSelect
        if(gatyaOption=='time1'){
          resultText+=gatyaAry[Math.floor(Math.random() * len)]+'の'+itemName+'を引いた。'+commma.format(karatetu19s[itemName])+'円かかった。';
        }else if(gatyaOption=='time10'){
          n = 10;
          for (i=0; i<9; i++){
            resultText+=gatyaAry[Math.floor(Math.random() * len)]+',';
          }
          resultText+=gatyaAry[Math.floor(Math.random() * len)];
          resultText+='の'+itemName+'を引いた。'+commma.format(karatetu19s[itemName]*n)+'円かかった。';
        }else if(gatyaOption=='chara'){
          gatya_MAX=1000;
          gatya_hazure=true;
          gatya_times=gatya_MAX;
          for(i=0;i<gatya_MAX;i++){
            gatya_chara=gatyaAry[Math.floor(Math.random() * len)];
            if(gatya_chara==charaName){
              gatya_hazure=false;
              gatya_times=i+1;
              break;
            }
          }
          if(gatya_times==gatya_MAX && gatya_hazure){
            resultText+=commma.format(karatetu19s[itemName]*gatya_MAX)+'円かけて'+gatya_MAX+'回引いたが、'+charaName+'の'+itemName+'を引くことはできなかった。。。';
          }else{
            resultText+=charaName+'の'+itemName+'を引くのに'+gatya_times+'回かかった。'+commma.format(karatetu19s[itemName]*gatya_times)+'円でした。';
          }
        }else if(gatyaOption=='charaNUM'){
          gatya_MAX=100000;
          gatya_hazure=true;
          gatya_atariMAX=$("input[name='numOfChara']").val();
          gatya_atariCount=0;
          gatya_times=gatya_MAX;
          for(i=0;i<gatya_MAX;i++){
            gatya_chara=gatyaAry[Math.floor(Math.random() * len)];
            if(gatya_chara==charaName){
              if(gatya_atariMAX== ++gatya_atariCount){
                gatya_hazure=false;
                gatya_times=i+1;
                break;
              }
            }
          }        
          if(gatya_times==gatya_MAX && gatya_hazure){
            if (gatya_atariCount==0){
              resultText+=commma.format(karatetu19s[itemName]*gatya_MAX)+'円かけて'+commma.format(gatya_MAX)+'回引いたが、'+charaName+'の'+itemName+'を一つも引くことはできなかった。。。';
            }else{
              resultText+=charaName+'の'+itemName+'が'+gatya_atariMAX+'個欲しくて'+commma.format(karatetu19s[itemName]*gatya_MAX)+'円かけて'+commma.format(gatya_MAX)+'回引き、'+commma.format(gatya_atariCount)+'個当てた。';
            }
          }else{
            resultText+=charaName+'の'+itemName+'を'+commma.format(gatya_atariMAX)+'個引くのに'+commma.format(gatya_times)+'回かかった。'+commma.format(karatetu19s[itemName]*gatya_times)+'円でした。'; 
          }
        }
      }
      $("textarea[name='result_text']").val(resultText);
      
      $('#attentionMSG').html('<b>アイテムを変えて再実行</b>する場合はこのページを<u>リロード</u>してください。<br><b>そのまま、もしくはキャラやオプションのみを変えての再実行</b>であればその<u>必要はありません</u>。そのまま「結果表示」を押すと再試行します。');
    }else{
      alert("アイテムは選択必須です");
      $("textarea[name='result_text']").val('');
      return -1; //異常終了
    }
  }else{
    alert("ガチャは選択必須です");
    $("textarea[name='result_text']").val('');
    return -1;
  }
  
  //正常終了
  return 0;
}


function copyText(){
  var result = document.getElementById('result');
  result.select();
  var succeeded = document.execCommand('copy');
  if (succeeded) {
    alert("クリップボードにコピーしました。");
  } else {
    alert("コピーに失敗しました。お手数ですが、ご自身でテキストボックス内を長押し等でコピーしてください。");
  }
}

function tweet(){
  result=document.result.result_text.value;
  url="http://twitter.com/share?text="+result+"%0a&hashtags=プリコネRガチャシミュレータ&url=https://yukuduri.github.io/purikoneR/gatya";
  window.open(url);
}