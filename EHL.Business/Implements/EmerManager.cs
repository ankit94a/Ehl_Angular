using EHL.Business.Interfaces;
using EHL.Common.Models;
using EHL.DB.Interfaces;
using Microsoft.AspNetCore.Http;
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
                long fileId = 0; // Variable to store file ID

                // Check if the file is provided
                if (emer.EmerFile != null && emer.EmerFile.Length > 0)
                {
                    // Create a new document object to store the file data
                    var doc = new Documents
                    {
                        Name = Path.GetFileName(emer.EmerFile.FileName), // Store file name
                        FileType = Path.GetExtension(emer.EmerFile.FileName), // Store file extension
                        Size = emer.EmerFile.Length, // Store file size
                        Document = ConvertToByteArray(emer.EmerFile) // Convert file to byte array
                    };

                    // Add the file information to the database and get the file ID
                    fileId = _emerDb.AddFile(doc);

                    if (fileId == null || fileId <= 0)
                    {
                        throw new Exception("Failed to save the file.");
                    }
                }

                // Assign the file ID to the EmerModel
                emer.FileId = fileId; // Assuming EmerModel has a FileId property

                // Save the EmerModel information in the database
                return _emerDb.AddEmer(emer);
            }
            catch (Exception ex)
            {
                // Log the error
                throw new Exception("Error while adding the EmerModel data.", ex);
            }
        }

        // Helper function to convert IFormFile to byte array
        private byte[] ConvertToByteArray(IFormFile file)
        {
            using (var memoryStream = new MemoryStream())
            {
                file.CopyTo(memoryStream);
                return memoryStream.ToArray();
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
