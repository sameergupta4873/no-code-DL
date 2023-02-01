from dotenv import load_dotenv
load_dotenv()

import os
from supabase import create_client

# Create a client
supabase = create_client(os.environ['SUPABASE_URL'], os.environ['SUPABASE_KEY'])

def upload_model(commit_id):
    model_response = supabase.storage().from_('model-bucket').upload(commit_id, f"../user_models/{commit_id}.pt" )
    id_response = supabase.table('models').insert({'model_id' : commit_id }).execute()

# resp = supabase.storage().from_('model-bucket').get_public_url('MyModel.pt')
#upload_model = supabase.storage().from_('model-bucket').upload(commit_id, f"{commit_id}.pt" )
# print("halfway")
# upload_id = supabase.table('models').insert({'model_id' : commit_id }).execute()

# print("done")