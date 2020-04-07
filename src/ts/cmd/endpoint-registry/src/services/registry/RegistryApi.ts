import { RegistryFactory } from './daos/postgres/RegistryFactory';
import { IIdentifier } from 'i40-aas-objects';
import { RegistryError } from '../../utils/RegistryError';
import {
  RegistryResultSet,
  IRegistryResultSet
} from './daos/interfaces/IRegistryResultSet';
import { iRegistry } from './daos/interfaces/IRegistry';
import {
  ICreateRole,
  ICreateSemanticProtocol,
  IAssignRoles,
  ICreateAsset,
  IAASDescriptor
} from './daos/interfaces/IApiRequests';
import { TIdType } from 'i40-aas-objects/dist/src/types/IdTypeEnum';
import { DeleteResult } from 'typeorm';

class RegistryApi {

  async readAASDescriptorByAASId(
    aasId: string
  ): Promise<IAASDescriptor | undefined> {
    //TODO: dependency injection is better
    var registryDao: iRegistry = await RegistryFactory.getRegistry();
      var result = await registryDao.readAASDescriptorByAasId(aasId);
      console.log(result);
      return result;
  }
  async updateAASDescriptorByAASId(
    req: IAASDescriptor
  ): Promise<IAASDescriptor | undefined> {
    var registryDao: iRegistry = await RegistryFactory.getRegistry();
      var result = await registryDao.updateAasDescriptorByAasId(req);
      console.log(result);
      return result;
  }
  async deleteAASDescriptorByAASId(
    aasId: string
  ): Promise<DeleteResult|undefined> {
    var registryDao: iRegistry = await RegistryFactory.getRegistry();
      var result = await registryDao.deleteAasDescriptorByAasId(aasId);
      console.log(result);
      return result;
  }


  async readRecordBySemanticProtocolAndRole(
    sProtocol: string,
    role: string
  ): Promise<any> {
    console.log(sProtocol);
    console.log(role);
    var registryDao: iRegistry = await RegistryFactory.getRegistry();
    try {
      var result = await registryDao.readEndpointBySemanticProtocolAndRole(
        sProtocol,
        role
      );
      console.log(JSON.stringify(result, null, 3));
      return result;
    } catch (e) {
      throw e;
    } finally {
      registryDao.release();
    }
  }

  async register(req: IAASDescriptor) {
    var registryDao: iRegistry = await RegistryFactory.getRegistry();
    try {
      var result = await registryDao.registerAas(req);
      console.log(result);
      return result;
    } catch (e) {
      throw e;
    } finally {
      registryDao.release();
    }
  }
  async createRole(req: ICreateRole) {
    var registryDao: iRegistry = await RegistryFactory.getRegistry();
    try {
      var result = await registryDao.createRole(req);
      console.log(result);
      return result;
    } catch (e) {
      throw e;
    } finally {
      registryDao.release();
    }
  }

  async createAsset(req: ICreateAsset) {
    var registryDao: iRegistry = await RegistryFactory.getRegistry();
    try {
      var result = await registryDao.createAsset(req);
      console.log(result);
      return result;
    } catch (e) {
      throw e;
    } finally {
      registryDao.release();
    }
  }
  async assignRolesToAAS(req: IAssignRoles) {
    var registryDao: iRegistry = await RegistryFactory.getRegistry();
    try {
      var result = await registryDao.assignRoles(req);
      console.log(result);
      return result;
    } catch (e) {
      throw e;
    } finally {
      registryDao.release();
    }
  }
  async createSemanticProtocol(req: ICreateSemanticProtocol) {
    var registryDao: iRegistry = await RegistryFactory.getRegistry();
    try {
      var result = await registryDao.createSemanticProtocol(req);
      console.log(result);
      return result;
    } catch (e) {
      throw e;
    } finally {
      registryDao.release();
    }
  }

  async getEndpointsByReceiverId(
    receiverId: string,
    receiverIdType: TIdType
  ): Promise<IAASDescriptor | undefined> {
    return this.readAASDescriptorByAASId(receiverId);
  }

  //TODO: why is this extra level of indirection needed?
  //getEndpointsByReceiverRolejust forwards the call
  async getEndpointsByReceiverRole(
    receiverRole: string,
    semanticProtocol: string
  ): Promise<Array<IRegistryResultSet>> {
    if (!semanticProtocol) {
      throw new RegistryError('Missing parameter semanticProtocol', 422);
    }
    return this.readRecordBySemanticProtocolAndRole(
      semanticProtocol,
      receiverRole
    );
  }

  async getAllEndpointsList(): Promise<Array<IRegistryResultSet>> {
    var registryDao: iRegistry = await RegistryFactory.getRegistry();
    try {
      var result = await registryDao.listAllEndpoints();
      console.log(result);
      return result;
    } catch (e) {
      console.log(e);
      throw e;
    } finally {
      registryDao.release();
    }
  }
}

export { RegistryApi };
