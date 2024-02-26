import Trie "mo:base/Trie";
import Time "mo:base/Time";
import Text "mo:base/Text";
import Bool "mo:base/Bool";
import Nat32 "mo:base/Nat32";

// define an actor

actor Credentials {
  // credential identifier
  public type CredentialID = Nat32;

  // trie for credential
  private func key(a : CredentialID) : Trie.Key<CredentialID> {
    return { hash = a; key = a };
  };

  // credential type
  public type Credential = {
    id : Nat32;
    issuer : Text;
    recipient : Text;
    details : Text;
    issuedAt : Text;
    validUntil : Text;
    revoked : ?Bool;
  };

  // Forthcoming credential indentifier
  private stable var next : CredentialID = 0;

  // credential storage 

  private stable var credentials : Trie.Trie<CredentialID, Credential> = Trie.empty();

  //post credential

  public func createCredential(credential : Credential) : async CredentialID {
    let cid = next;
    next += 1;


    credentials := Trie.replace(
      credentials,
      key(credential.id),
      Nat32.equal,
      ?credential,
    ).0;

    return cid;
  };

  // fetch credential record

  public query func read(id : Nat32) : async ?Credential {
    let result = Trie.find(credentials, key(id), Nat32.equal);
    return result;
  };
};



