import { Component, VERSION, OnInit, ViewChild } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { Result } from '@zxing/library';
import { Produto } from './produto.model';

@Component({
  selector: 'app-leitor',
  templateUrl: './leitor.component.html',
  styleUrls: ['./leitor.component.scss']
})
export class LeitorComponent implements OnInit {

  @ViewChild('scanner')
  scanner: ZXingScannerComponent;

  habilitarLeitor: boolean = true;

  listaEstoque: Array<Produto> = new Array<Produto>();

  existeDispositivoDeCamera: boolean;
  temPermissao: boolean;
  codigoDeBarras: string;
  qrResult: Result;

  camerasDisponiveis: MediaDeviceInfo[];
  dispositivoCamera: MediaDeviceInfo;

  ngOnInit(): void {

    this.scanner.camerasFound.subscribe((cameras: MediaDeviceInfo[]) => {
      this.existeDispositivoDeCamera = true;
      this.camerasDisponiveis = cameras;

      for (const camera of cameras) {
        if (/back|rear|environment/gi.test(camera.label)) {
          this.scanner.changeDevice(camera);
          this.dispositivoCamera = camera;
          break;
        }
        if (camera != undefined && camera != null) {
         // this.dispositivoCamera = camera;
        }
      }
    });

    this.scanner.camerasNotFound.subscribe(() => this.existeDispositivoDeCamera = false);
    this.scanner.scanComplete.subscribe((result: Result) => this.qrResult = result);
    this.scanner.permissionResponse.subscribe((perm: boolean) => this.temPermissao = perm);
  }

  displayCameras(cameras: MediaDeviceInfo[]) {
    console.log('Cameras: ', cameras);
    this.camerasDisponiveis = cameras;
  }

  onSucessoLerCodigoBarras(resultString: string) {
    this.codigoDeBarras = resultString;
    this.playAudio();
    this.listaEstoque.push(new Produto(resultString, 1));

    console.log(this.listaEstoque);
  }

  onDispositivoDeCameraSelecionado(selectedValue: string) {
    console.log('Selection changed: ', selectedValue);
    if (selectedValue == '')
      this.codigoDeBarras = '';
    this.dispositivoCamera = this.scanner.getDeviceById(selectedValue);
  }

  playAudio() {
    let audio = new Audio();
    audio.src = "../../../assets/audio/barcode-beep.mp3";
    audio.load();
    audio.play();
  }
}