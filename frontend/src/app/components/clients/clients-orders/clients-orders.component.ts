import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {Client, ClientService} from '../../../services/clients/clients.service';
import {CommandeService,  ClientOrderDetails, CommandeDetails, LigneCommande} from '../../../services/commandes/commande.service';

@Component({
  selector: 'app-client-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clients-orders.component.html',
  styleUrls: ['./clients-orders.component.css']
})
export class ClientOrdersComponent implements OnInit {
  clients: Client[] = [];
  selectedClientId: string = '';
  clientOrderDetails: ClientOrderDetails | null = null;
  isLoading: boolean = false;
  today: Date = new Date();


  constructor(
    private clientService: ClientService,
    private commandeService: CommandeService
  ) { }

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.isLoading = true;
    this.clientService.getAllClients().subscribe({
      next: (clients) => {
        this.clients = clients;
        this.isLoading = false;
      },

      error: (error) => {
        console.error('Error loading clients:', error);
        this.isLoading = false;
      }
    });
  }

  onClientChange(): void {
    if (this.selectedClientId) {
      this.loadClientOrders(this.selectedClientId);
    } else {
      this.clientOrderDetails = null;
    }
  }

  loadClientOrders(clientId: string): void {
    this.isLoading = true;
    this.commandeService.getClientOrderDetails(clientId).subscribe({
      next: (details) => {
        this.clientOrderDetails = details;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading client orders:', error);
        this.isLoading = false;
      }
    });
  }

  // Calculate totals across all orders
  getTotalHT(): number {
    if (!this.clientOrderDetails?.orders) return 0;
    return this.clientOrderDetails.orders.reduce((sum, order) => sum + order.totalHT, 0);
  }

  getTotalTTC(): number {
    if (!this.clientOrderDetails?.orders) return 0;
    return this.clientOrderDetails.orders.reduce((sum, order) => sum + order.totalTTC, 0);
  }

  // Format price to two decimal places
  formatPrice(price: number): string {
    return price.toFixed(2);
  }
}
