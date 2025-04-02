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
		public List<EmerModel> GetAllMasterSheet()
		{
			return _emerDb.GetAllMasterSheet();
		}
		public async Task<bool> AddEmer(EmerModel emer)
		{
			try
			{
				long fileId = 0;
				if (emer.EmerFile != null && emer.EmerFile.Length > 0)
				{
					// Define the directory path where the file will be saved
					string uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "emer");

					// Ensure the directory exists
					if (!Directory.Exists(uploadsFolder))
					{
						Directory.CreateDirectory(uploadsFolder);
					}

					// Generate a unique file name
					string uniqueFileName = $"{Guid.NewGuid()}{Path.GetExtension(emer.EmerFile.FileName)}";
					string fullFilePath = Path.Combine(uploadsFolder, uniqueFileName);

					Console.WriteLine($"Saving file to: {fullFilePath}"); // Debugging

					// Save the file locally
					using (var fileStream = new FileStream(fullFilePath, FileMode.Create, FileAccess.Write, FileShare.None))
					{
						await emer.EmerFile.CopyToAsync(fileStream);
					}

					// Store the relative path in DB
					string relativeFilePath = Path.Combine("emer", uniqueFileName);

					var doc = new Documents
					{
						Name = Path.GetFileName(emer.EmerFile.FileName),
						FileType = Path.GetExtension(emer.EmerFile.FileName),
						Size = emer.EmerFile.Length,
						FilePath = relativeFilePath,
						CreatedBy = 1,
						UpdatedBy = 1,
						CreatedOn = DateTime.Now,
						IsActive = true,
						IsDeleted = false
					};

					// Store in database (ensure async method)
					fileId = _emerDb.AddFile(doc);

					if (fileId <= 0)
					{
						throw new Exception("Failed to save the file.");
					}
				}

				return _emerDb.AddEmer(emer);
			}
			catch (Exception ex)
			{
				Console.WriteLine($"Error: {ex.Message}");
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
