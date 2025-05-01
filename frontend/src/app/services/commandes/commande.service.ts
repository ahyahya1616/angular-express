import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Produit {
  _id: string;
  libelle: string;
  prix_ht: number;
  prix_ttc: number;
}

export interface LigneCommande {
  produitId: string;
  libelle: string;
  quantite: number;
  prixUnitaireHT: number;
  prixUnitaireTTC: number;
  totalHT: number;
  totalTTC: number;
}

export interface CommandeDetails {
  commandeId: string;
  date: Date;
  lignes: LigneCommande[];
  totalHT: number;
  totalTTC: number;
}

export interface ClientOrderDetails {
  clientId: string;
  orders: CommandeDetails[];
}

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private apiUrl = 'http://localhost:3000/api/commandes';

  constructor(private http: HttpClient) { }

  getClientOrderDetails(clientId: string): Observable<ClientOrderDetails> {
    return this.http.get<ClientOrderDetails>(`${this.apiUrl}/client/${clientId}/details`);
  }
}
