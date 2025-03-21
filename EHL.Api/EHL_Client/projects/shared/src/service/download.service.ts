import { ApiService } from './api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor(private ApiService:ApiService) { }

  download(downloadModel: any, urlStr) {

    this.ApiService.getWithHeaderToDownload(urlStr, downloadModel).subscribe((res: Blob) => {

        var linkElement = document.createElement('a');

        linkElement.href = URL.createObjectURL(res);

       // linkElement.href = window.URL.createObjectURL(res);
        if (downloadModel.attachmentUrl != undefined && downloadModel.attachmentUrl.length > 0) {
           // linkElement.href = window.URL.createObjectURL(res);

            linkElement.download = downloadModel.attachmentUrl[1];
        }
        else {
            //linkElement.href = window.URL.createObjectURL(res);
            if(downloadModel.fileType==='pdf')
            {
            linkElement.download = downloadModel.data.split(',')[1] + "_" + new Date().toLocaleDateString() + ".pdf";
            }
            else
            {
            linkElement.download = downloadModel.fileType + "_" + new Date().toLocaleDateString() + ".pdf";
            }
        }
        var clickEvent = new MouseEvent("click", {
            "view": window,
            "bubbles": true,
            "cancelable": false
        });
        linkElement.dispatchEvent(clickEvent);
    });
}
}
