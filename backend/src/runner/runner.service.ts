import { Injectable } from '@nestjs/common';
import RunnerStatus from 'src/data/models/runner-status.enum';
import { Runner } from '../data/models/runner.model';

@Injectable()
export class RunnerService {
  async getAvailableRunners(
    status: RunnerStatus,
    labels: string[],
  ): Promise<number> {
    // Logic to get the count of available runners based on status and labels
    console.log(
      `Fetching available runners with status: ${status} and labels: ${labels}`,
    );
    return 0; // Replace with actual logic
  }

  async spinUpRunner(count: number, labels: string[]): Promise<void> {
    // Logic to spin up runners
    console.log(`Spinning up ${count} runners with labels: ${labels}`);
  }

  async isProperNumberOfRunners(status: RunnerStatus): Promise<boolean> {
    // Logic to check if the proper number of runners exist
    console.log(`Checking proper number of runners with status: ${status}`);
    return true; // Replace with actual logic
  }

  async shutDownRunner(count: number, labels: string[]): Promise<void> {
    // Logic to shut down runners
    console.log(`Shutting down ${count} runners with labels: ${labels}`);
  }

  async spinUpAWSEC2(labels: string[]): Promise<void> {
    // Logic to spin up EC2 instances
    console.log(`Spinning up AWS EC2 instances with labels: ${labels}`);
  }

  async shutDownAWSEC2(urn: string): Promise<void> {
    // Logic to shut down EC2 instances
    console.log(`Shutting down AWS EC2 instance with URN: ${urn}`);
  }

  async spinUpVagrantVM(labels: string[]): Promise<void> {
    // Logic to spin up Vagrant VMs
    console.log(`Spinning up Vagrant VMs with labels: ${labels}`);
  }

  async shutDownVagrantVM(vagrant_id: string): Promise<void> {
    // Logic to shut down Vagrant VMs
    console.log(`Shutting down Vagrant VM with ID: ${vagrant_id}`);
  }

  async spinUpDocker(labels: string[]): Promise<void> {
    // Logic to spin up Docker containers
    console.log(`Spinning up Docker containers with labels: ${labels}`);
  }

  async shutDownDocker(docker_id: string): Promise<void> {
    // Logic to shut down Docker containers
    console.log(`Shutting down Docker container with ID: ${docker_id}`);
  }

  async getRunner(id?: string, args?: Runner): Promise<Runner[]> {
    // Logic to get runners based on id or other arguments
    console.log(
      `Fetching runners with id: ${id} and args: ${JSON.stringify(args)}`,
    );
    return []; // Replace with actual logic
  }
}
