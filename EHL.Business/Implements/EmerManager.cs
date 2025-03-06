using EHL.Business.Interfaces;
using EHL.Common.Models;
using EHL.DB.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EHL.Business.Implements
{
	public class EmerManager : IEmerManager
	{
		private readonly IEmerDB _emerDb;
		public EmerManager(IEmerDB emerDB)
		{
			_emerDb = emerDB;
		}
		public List<EmerModel> GetAllEmer()
		{
			return _emerDb.GetAllEmer();
		}
		public bool AddEmer(EmerModel emer)
		{
			try
			{
				// Check if the file is provided
				if (emer.EmerFile != null && emer.EmerFile.Length > 0)
				{
					// Create a new document object to store the file data
					var doc = new Documents
					{
						//Name = Path.GetFileNameWithoutExtension(emer.EmerFile), // Store file name
						FileType = Path.GetExtension(emer.EmerFile.ToString()),  // Store file type/extension
						Size = emer.EmerFile.Length,  // Store file size
						Document = emer.EmerFile // Store file content as byte array in the database
					};

					// Add the file information to the database
					var result = _emerDb.AddFile(doc);  // Assuming AddFile handles saving file data

					if (result > 0)
					{
						// Save the EmerModel information in the database
						return _emerDb.AddEmer(emer);
					}
				}

				return false;
			}
			catch (Exception ex)
			{
				// Log the error
				throw new Exception("Error while adding the EmerModel data.", ex);
			}
		}


		public bool UpdateEmer(EmerModel emer)
		{
			return _emerDb.UpdateEmer(emer);
		}
		public bool DeactivateEmer(long Id)
		{
			return _emerDb.DeactivateEmer(Id);
		}
	}
}
