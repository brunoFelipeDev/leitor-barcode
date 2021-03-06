import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { Result } from '@zxing/library';
import { Produto } from './produto.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-leitor',
  templateUrl: './leitor.component.html',
  styleUrls: ['./leitor.component.scss']
})
export class LeitorComponent implements OnInit {

  @ViewChild('scanner')
  scanner: ZXingScannerComponent;

  podeLerCodigoBarras = true;

  _opened: boolean = false;

  habilitarLeitor: boolean = true;

  listaEstoque: Array<Produto> = new Array<Produto>();

  existeDispositivoDeCamera: boolean;
  temPermissao: boolean;
  codigoDeBarras: string;
  qrResult: Result;

  temCameraTraseira : boolean = false;

  camerasDisponiveis: MediaDeviceInfo[];
  dispositivoCamera: MediaDeviceInfo;

  modalRef: BsModalRef;

  constructor(private route: ActivatedRoute, private router : Router, private modalService: BsModalService) {
   }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['cnpj'] == '99999999999') {
        this.scanner.camerasFound.subscribe((cameras: MediaDeviceInfo[]) => {
          this.existeDispositivoDeCamera = true;
          this.camerasDisponiveis = cameras;

          for (const camera of cameras) {
            if (/back|rear|environment/gi.test(camera.label)) {
              this.scanner.changeDevice(camera);
              this.dispositivoCamera = camera;
              this.temCameraTraseira = true;
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
      } else {
        this.router.navigate(['login']);
      }
    });
  }

  displayCameras(cameras: MediaDeviceInfo[]) {
    console.log('Cameras: ', cameras);
    this.camerasDisponiveis = cameras;
  }

  onSucessoLerCodigoBarras(resultString: string) {

    if (this.podeLerCodigoBarras) {
      this.podeLerCodigoBarras = false;
      this.codigoDeBarras = resultString;
      this.playAudio();
      this.listaEstoque.push(new Produto(resultString, 1));

      console.log(this.listaEstoque);
      setTimeout(() => {
        this.podeLerCodigoBarras = true;
        this.codigoDeBarras = null;
      }, 3000);

    }
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

  _toggleSidebar() {
    this._opened = !this._opened;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}